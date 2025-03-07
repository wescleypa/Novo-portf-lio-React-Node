import * as React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Collapse, CardActionArea, CardMedia, CardContent, CardActions, Button, Grid2 as Grid, Rating, Skeleton, Chip, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { CircularProgress, Badge } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { Pagination } from '@mui/material';
import { Code as CodeIcon, ArrowBack } from '@mui/icons-material';
import { SocketContext } from '../../../../components/Providers/socket';

import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from '@toolpad/core/Account';
import ProductPage from './pages/product';
import { useFormContext } from 'react-hook-form';


function formatarValor(valor) {
  const value = parseFloat(valor).toFixed(2);
  return value?.toString()?.includes('.') ? value?.toString().replace('.', ',') : value;
}

function CardProduct({ id, image, title, desc, price, originalPrice, rating, avaliacoesCarregando, avaliacoes, onAdicionarAoCarrinho, carrinho, setPathname, selectedProduct, setSelectedProduct, extraProduct }) {

  function goProduct() {
    setSelectedProduct(Object.assign({}, extraProduct, avaliacoes, { avaliacoesCarregando }));
    setPathname('/product');
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2, position: 'relative' }}>
      <CardActionArea onClick={() => goProduct()}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            sx={{
              background: `url(${image})`,
              backgroundSize: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              borderRadius: '4px',
              filter: 'drop-shadow(4px 4px 4px black)',
              padding: '4px',
            }}>
            <img style={{ width: 80 }} alt="Compra segura" src="https://blog.mundolipedema.com.br/wp-content/uploads/2022/06/certificado2-1024x1024.png" />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '4px',
              padding: '4px',
            }}
          >
            {avaliacoesCarregando ? (
              <div style={{ color: 'grey', display: 'flex', alignItems: 'center', gap: 4 }}>
                <CircularProgress size={24} /> Carregando avaliação
              </div>
            ) : avaliacoes && avaliacoes?.rating > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Rating
                  name="read-only"
                  value={avaliacoes?.rating} // Exibe a primeira avaliação (ou a média, se necessário)
                  readOnly
                />
                <span style={{ color: 'grey' }}>{avaliacoes?.avaliacoes}</span>
              </div>
            ) : (
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Este produto não possui avaliações.
              </Typography>
            )}
          </Box>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="body1" component="div"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2, // Limita o texto a 3 linhas
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 2,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3, // Limita o texto a 3 linhas
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {desc}
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            R$ {formatarValor(price)}
            <small style={{ position: 'absolute', fontSize: 12 }}><s>R$ {formatarValor(originalPrice)}</s></small>
          </Typography>
          <Chip label="Frete grátis" color="success" />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Tooltip title="Adicionar ao carrinho">
          <IconButton onClick={onAdicionarAoCarrinho}>
            <Badge badgeContent={carrinho.find((item) => item.id === id)?.quantidade || 0} color="primary">
              <ShoppingCartIcon sx={{ color: 'primary.main' }} />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Compartilhar produto">
          <IconButton>
            <ShareIcon sx={{ color: 'primary.main' }} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

function DashboardPage({
  products,
  loading,
  onAdicionarAoCarrinho,
  carrinho,
  setPathname,
  selectedProduct,
  setSelectedProduct,
  searchedInput,
  setProducts,
}) {
  const socket = React.useContext(SocketContext);
  const [avaliacoesPorProduto, setAvaliacoesPorProduto] = useState([]);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(6); // Estado para controlar quantos produtos são exibidos

  useEffect(() => {
    const handleAvaliacoes = ({ productId, reviews }) => {
      const { detail } = reviews;

      if (reviews?.reviews && reviews?.reviews.length > 0) {
        setAvaliacoesPorProduto((prev) => ({
          ...prev,
          [productId]: {
            rating: reviews.reviews[0]?.rating,
            avaliacoes: reviews.reviews[0]?.avaliacoes,
            detail: detail || [],
          },
        }));
      } else {
        setAvaliacoesPorProduto((prev) => ({
          ...prev,
          [productId]: {
            rating: 0,
            avaliacoes: 'Sem avaliações',
            detail: [],
          },
        }));
      }
    };
    
    if (socket)
      socket.on('avaliacoes_produto', handleAvaliacoes);

    return () => {
      if (socket)
        socket.off('avaliacoes_produto', handleAvaliacoes);
    };
  }, [socket]);

  const handlePageChange = (event, page) => {
    setPaginationLoading(true);
    socket.emit('buscar_produto', searchedInput, page, (response) => {
      if (response.error) {
        console.error('Error fetching products:', response.error);
      } else {
        setProducts(response);
      }
      setPaginationLoading(false);
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função para carregar mais produtos
  const handleVerMais = () => {
    setVisibleProducts((prev) => prev + 6);
  };

  // Função para voltar à exibição inicial
  const handleVerMenos = () => {
    setVisibleProducts(6);
    scrollToSection('projetos');
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        p: 2,
      }}
    >
      {searchedInput ? (
        <Typography variant="h6">
          Lista de <b>{searchedInput}</b> com base em sua pesquisa
        </Typography>
      ) : (
        <Typography variant="h6">Nossos produtos em destaque top em vendas</Typography>
      )}
      <Grid container spacing={2} sx={{ justifyContent: 'center', width: '100%', p: 2 }}>
        {loading ? (
          // Exibe Skeletons enquanto os produtos estão sendo carregados
          Array.from({ length: 6 }).map((_, index) => (
            <Grid item key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ maxWidth: 345, m: 2 }}>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          // Exibe os produtos quando carregados, limitando à quantidade visível
          products?.produtos?.slice(0, visibleProducts).map((product, index) => (
            <Grid item key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <CardProduct
                id={product?.id}
                image={product.imagem}
                title={product.titulo}
                desc={product.desc}
                price={product.preco}
                originalPrice={product.originalPrice}
                rating={product.rating}
                avaliacoesCarregando={!avaliacoesPorProduto[product.id]}
                avaliacoes={avaliacoesPorProduto[product.id] || []}
                onAdicionarAoCarrinho={() => onAdicionarAoCarrinho(product)}
                carrinho={carrinho}
                setPathname={setPathname}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                extraProduct={product}
              />
            </Grid>
          ))
        )}
      </Grid>

      {/* Paginação */}
      <Collapse in={products?.paging && visibleProducts === products?.produtos?.length} sx={{ position: 'relative', mt: 2, mb: 2 }}>
        <Pagination
          onChange={handlePageChange}
          count={Math.ceil(products?.paging?.total / 50)}
          variant="outlined"
          color="primary"
          disabled={paginationLoading}
        />
        {paginationLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Collapse>

      {/* Botões "Ver mais" e "Ver menos" */}
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        {visibleProducts < products?.produtos?.length && (
          <Button variant="contained" onClick={handleVerMais}>
            Ver mais
          </Button>
        )}
        {visibleProducts > 6 && (
          <Button variant="outlined" onClick={handleVerMenos}>
            Ver menos
          </Button>
        )}
      </Box>
    </Box>
  );
}

/*function CarrinhoPage({ carrinho, onRemoverDoCarrinho, setPathname }) {
  // Função para calcular o total do carrinho
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => {
      return total + item.preco * item.quantidade;
    }, 0);
  };

  // Função para finalizar a compra
  const finalizarCompra = () => {
    setPathname('/checkout');
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Grid container gap={4}>
        <Grid item>
          <Typography variant="h4">Carrinho de Compras</Typography>
        </Grid>
        <Grid item>
          {/* Total do Carrinho e Botão de Comprar *}
          <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Total do Carrinho: R$ {formatarValor(calcularTotal())}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={finalizarCompra}
            >
              Finalizar Compra
            </Button>
          </Box>
        </Grid>
      </Grid>

      {carrinho.length > 0 ? (
        <>
          <Grid container spacing={2} sx={{ justifyContent: 'center', width: '100%', p: 2 }}>
            {carrinho.map((item, index) => (
              <Grid item key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ maxWidth: 345, m: 2, position: 'relative' }}>
                  <CardActionArea>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.imagem} // Usa a imagem do produto
                        alt={item.titulo}
                        sx={{
                          backgroundSize: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          borderRadius: '4px',
                          filter: 'drop-shadow(4px 4px 4px black)',
                          padding: '4px',
                        }}
                      >
                        <img
                          style={{ width: 80 }}
                          src="https://blog.mundolipedema.com.br/wp-content/uploads/2022/06/certificado2-1024x1024.png"
                          alt="Certificado"
                        />
                      </Box>
                    </Box>
                    <CardContent>
                      <Typography gutterBottom variant="body1" component="div"
                        sx={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.titulo}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mb: 2,
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.desc}
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                        R$ {formatarValor(item.preco)} x {item.quantidade}
                      </Typography>
                      <Chip label="Frete grátis" color="success" />
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onRemoverDoCarrinho(item.id)}
                    >
                      Remover
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          O carrinho está vazio.
        </Typography>
      )}
    </Box>
  );
}*/

// Função para renderizar a página correta com base na rota
function renderPage(pathname, selectedProduct = null, setSelectedProduct = null, setPathname = null, products, loading = false, carrinho, onRemoverDoCarrinho = null, onAdicionarAoCarrinho, searchedInput = null, setProducts) {
  return (
    <>
      <Collapse in={pathname === '/home'}>
        <DashboardPage products={products} loading={loading} onAdicionarAoCarrinho={onAdicionarAoCarrinho} carrinho={carrinho} setPathname={setPathname} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} searchedInput={searchedInput} setProducts={setProducts} />
      </Collapse>
      {/*<Collapse in={pathname === '/carrinho'}>
        <CarrinhoPage carrinho={carrinho} onRemoverDoCarrinho={onRemoverDoCarrinho} setPathname={setPathname} />
      </Collapse>
      <Collapse in={pathname === '/login'}><LoginPage setPathname={setPathname} /></Collapse>
      <Collapse in={pathname === '/register'}><RegisterPage /></Collapse>*/
        <Collapse in={pathname === '/product'}><ProductPage product={selectedProduct} onAdicionarAoCarrinho={onAdicionarAoCarrinho} carrinho={carrinho} setSelectedProduct={setSelectedProduct} setPathname={setPathname} /></Collapse>
      /*<Collapse in={pathname === '/checkout'}><Checkout carrinho={carrinho} /></Collapse>*/}
    </>
  );
}

function AccountSidebarPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

AccountSidebarPreview.propTypes = {
  handleClick: PropTypes.func,
  mini: PropTypes.bool.isRequired,
  open: PropTypes.bool,
};

const accounts = [
  {
    id: 1,
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
    projects: [
      {
        id: 3,
        title: 'Project X',
      },
    ],
  },
  {
    id: 2,
    name: 'Bharat MUI',
    email: 'bharat@mui.com',
    color: '#8B4513', // Brown color
    projects: [{ id: 4, title: 'Project A' }],
  },
];

function SidebarFooterAccountPopover() {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Accounts
      </Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem
            key={account.id}
            component="button"
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              columnGap: 2,
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.95rem',
                  bgcolor: account.color,
                }}
                src={account.image ?? ''}
                alt={account.name ?? ''}
              >
                {account.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
              primary={account.name}
              secondary={account.email}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

const createPreviewComponent = (mini) => {
  function PreviewComponent(props) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini }) {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
      }}
      localeText={{
        signInLabel: 'Acessar minha conta'
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

SidebarFooterAccount.propTypes = {
  mini: PropTypes.bool.isRequired,
};

function ToolbarActionsSearch({ setProducts, loading, pathname, setPathname, searchedInput, setActiveContent, setSubSelected }) {
  const [searchInput, setSearch] = useState();
  const socket = React.useContext(SocketContext);

  const search = () => {
    if (searchInput) {
      searchedInput(searchInput);
      if (pathname !== '/home') setPathname('/home');
      loading(true);
      const searchProduct = async (query) => {
        return new Promise((resolve, reject) => {
          socket.emit('buscar_produto', query, 1, (response) => {
            if (response.error) {
              reject(response.error);
            } else {
              resolve(response);
            }
            loading(false);
          });
        });
      };

      searchProduct(searchInput)
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error('Error searching product:', error);
        });
    }
  };

  const back = () => {
    setSubSelected(null);
    setActiveContent(false);
  };

  return (
    <Box>
      <Container
        sx={{
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          mt: 4,
        }}
      >
        <Grid container>
          {/* Botão de voltar */}
          <Grid item sx={{ position: 'absolute', left: { xs: 0, md: 40 } }}>
            <IconButton aria-label="back" sx={{ fontSize: 15, mb: 4 }} onClick={() => back()}>
              <ArrowBack />&nbsp;Voltar
            </IconButton>
          </Grid>
          <Grid item>
            <Typography
              component="h2"
              variant="h4"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              gutterBottom
            >
              <CodeIcon />
              &nbsp;Produtos by mercadolivre
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Obtenha produtos e avaliações do mercado livre, sistema desenvolvido sem autenticação para impedir rastros.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <TextField
          label="Pesquisar produto"
          variant="outlined"
          size="small"
          onChange={(e) => setSearch(e?.target?.value)}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton type="button" aria-label="search" size="small" onClick={() => search()}>
                  <SearchIcon />
                </IconButton>
              ),
              sx: { pr: 0.5 },
            },
          }}
          sx={{
            display: 'flex',
            mr: 1,
            width: { xs: '80%', md: '900px' },
          }}
        />
      </Stack>
    </Box>
  );
}

function Layout({ getDestaque, setActiveContent, setSubSelected }) {

  const socket = React.useContext(SocketContext);
  const [pathname, setPathname] = React.useState('/home');
  const [products, setProducts] = React.useState({ produtos: [], paging: {} }); // Inicializa com estrutura correta
  const [loading, setLoading] = React.useState(false);
  const [carrinho, setCarrinho] = React.useState([]);

  //const [session, setSession] = React.useState();

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const produtoExistente = prev.find((item) => item.id === produto.id);
      if (produtoExistente) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerDoCarrinho = (productId) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== productId));
  };

  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [searchedInput, setSearchedInput] = React.useState(null);

  const categoriasEmDestaque = [
    { categoria: 'Celulares em destaque', termo: 'iphone 16 pro max' },
    { categoria: 'Notebooks em destaque', termo: 'macbook pro i9' },
    { categoria: 'Bicicletas em destaque', termo: 'bicicleta scott' },
    { categoria: 'Televisões em destaque', termo: 'televisão 4k 70 polegadas' },
    { categoria: 'Geladeiras em destaque', termo: 'geladeira com freezer inox electrolux 590l' },
  ];

  const buscarProdutosEmDestaque = async () => {
    setLoading(true);
    const produtosEmDestaque = [];

    for (const categoria of categoriasEmDestaque) {
      const produtos = await new Promise((resolve, reject) => {
        socket.emit('buscar_produtos_destaque', categoria.termo, (response) => {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response);
          }
        });
      });
      produtosEmDestaque.push(...produtos?.slice(0, 3));
    }

    setProducts({ produtos: produtosEmDestaque, paging: { total: produtosEmDestaque.length } });
    setLoading(false);
  };

  const [destaqueLoaded, setDestaqueLoaded] = useState(false);
  if (getDestaque && !destaqueLoaded) {
    buscarProdutosEmDestaque();
    setDestaqueLoaded(true);
  }

  return (
    <>
      <ToolbarActionsSearch
        setProducts={setProducts}
        loading={setLoading}
        pathname={pathname}
        setPathname={setPathname}
        searchedInput={setSearchedInput}
        setActiveContent={setActiveContent}
        setSubSelected={setSubSelected}
      />
      {renderPage(pathname, selectedProduct, setSelectedProduct, setPathname, products, loading, carrinho, removerDoCarrinho, adicionarAoCarrinho, searchedInput, setProducts)}
    </>
  );
}

Layout.propTypes = {
  window: PropTypes.func,
};

export default Layout;