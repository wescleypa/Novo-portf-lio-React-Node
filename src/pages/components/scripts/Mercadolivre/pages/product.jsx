import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Button, Grid2 as Grid, Card, CardContent, Rating, Chip, Dialog, IconButton, Skeleton, Badge } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { Close as CloseIcon } from '@mui/icons-material';
import { FormControlLabel, Checkbox } from '@mui/material';
import { SocketContext } from '../../../../../components/Providers/socket';
import { ArrowBack } from '@mui/icons-material';

const ProductPage = ({ product, onAdicionarAoCarrinho, carrinho, setSelectedProduct, setPathname }) => {
  const socket = useContext(SocketContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [Reviews, setReviews] = useState([]);
  const [avaliacoesCarregando, setAvaliacoesCarregando] = useState(product?.avaliacoesCarregando ?? true);

  const handleComprar = () => {
    onAdicionarAoCarrinho(product);
  };

  useEffect(() => {
    if (product?.detail && product?.detail?.length > 0) {
      const formattedReviews = product.detail.map((item, index) => ({
        id: index,
        comment: item?.comment,
        photos: item?.photos,
        created: item?.created,
        stars: item?.stars ? (item?.stars?.match(/Avaliação (\d+)/))[1] : null
      }));
      setReviews(formattedReviews);
    } else {
      setReviews([]);
    }
  }, [product]);

  useEffect(() => {
    const handleAvaliacoes = (data) => {
      if (!data?.reviews || !data?.productId) return;

      const { productId, reviews } = data;

      if (productId === product?.id) {
        const { detail } = reviews;

        if (detail && detail?.length > 0) {
          const formattedReviews = detail.map((item, index) => ({
            id: index,
            comment: item?.comment,
            photos: item?.photos,
            created: item?.created,
            stars: item?.stars ? (item?.stars?.match(/Avaliação (\d+)/))[1] : null
          }));
          product.rating = reviews?.reviews[0]?.rating;
          product.avaliacoes = reviews?.reviews[0]?.avaliacoes;
          setReviews(formattedReviews);
        } else {
          setReviews([]);
        }
        setAvaliacoesCarregando(false);
      }
    };

    if (product?.avaliacoesCarregando && socket) {
      socket.on('avaliacoes_produto', handleAvaliacoes);
    } else {
      setAvaliacoesCarregando(false);
    }

    return () => {
      if (socket)
        socket.off('avaliacoes_produto', handleAvaliacoes);
    };
  }, [product]);

  function formatarValor(valor) {
    const value = parseFloat(valor).toFixed(2);
    return value?.toString()?.includes('.') ? value?.toString().replace('.', ',') : value;
  }

  const productt = {
    name: product?.titulo,
    description: product?.desc,
    price: product?.preco,
    originalPrice: product?.originalPrice,
    images: product?.pictures ? product?.pictures?.map((item) => item?.url) : [],
    rating: product?.rating ?? 0,
    avaliacoes: product?.avaliacoes ?? '0 avaliações',
    condicao: product?.condicao,
    cores: product?.cores && product?.cores?.length > 0 ? product?.cores : [],
    reviews: Reviews
  };

  const back = () => {
    setPathname('/home');
    setSelectedProduct(null);
  };

  return (
    <Container>
      {/* Botão de voltar */}
      <Grid item>
        <IconButton aria-label="back" sx={{ fontSize: 15, mb: 4 }} onClick={() => back()}>
          <ArrowBack />&nbsp;Voltar à Lista
        </IconButton>
      </Grid>
      <Grid container spacing={4} sx={{ p: { xs: 2, md: 4 } }}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={false}
            style={{ backgroundColor: 'white', height: 400 }}
          >
            {productt.images.map((image, index) => (
              <SwiperSlide key={index}>
                <Chip sx={{ ml: 4, position: 'absolute', right: 10, top: 10 }} label={productt?.condicao && productt?.condicao === 'new' ? 'Produto novo' : 'Produto usado'} color="primary" />
                <img src={image} onClick={() => setSelectedImage(image)} alt={`Imagem ${index + 1}`} style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" gutterBottom>
            {productt.name}
          </Typography>
          <Typography variant="h5" gutterBottom style={{ position: 'relative' }}>
            <small style={{ fontSize: 12 }}>
              De <s>R$ {formatarValor(productt?.originalPrice)}</s>
            </small>
            <small style={{ fontSize: 16 }}>
              &nbsp;por&nbsp;
            </small>
            R$ {formatarValor(productt.price)}
            <Chip sx={{ ml: 4 }} label="Promoção" color="success" />
          </Typography>

          {productt?.cores?.length > 0 && (
            <Grid container sx={{ display: 'flex', flexDirection: 'column', mt: 4 }}>
              Cores disponíveis
              {productt.cores.map((cor, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox defaultChecked={productt?.cores?.length <= 1} />}
                  label={cor[0]?.name || 'Cor indisponível'} // Acessa o nome da cor
                />
              ))}
            </Grid>
          )}
          <Chip label="Frete grátis" color="primary" />

          <Grid container gap={2} sx={{ mt: 6 }}>
            <Button variant="contained" color="primary" size="large" onClick={handleComprar}>
              Comprar
            </Button>
            <Badge badgeContent={carrinho.find((item) => item.id === product?.id)?.quantidade || 0} color="success">
              <Button variant="outlined" color="success" size="large" onClick={() => onAdicionarAoCarrinho(product)}>
                Adicionar ao carrinho
              </Button>
            </Badge>
          </Grid>
        </Grid>
      </Grid>

      <Typography variant="body1" paragraph>
        Descrição
      </Typography>
      <Typography variant="body2" color="primary.main" paragraph>
        {Array.isArray(productt?.description) && productt?.description?.length > 0 ? (
          productt.description.map((item, index) => (
            <div key={index} style={{ color: '#E6E6E6' }}>{item}</div>
          ))
        ) : typeof productt?.description === 'string' ? (
          <div style={{ color: '#E6E6E6' }}>{productt.description}</div>
        ) : (
          'Sem descrição'
        )}
      </Typography>

      <Grid mt={4}>
        <Grid container>
          <Grid item size={{ xs: 12, md: 3 }} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ textAlign: 'center' }} gutterBottom>
              Avaliações
            </Typography>
            <Typography variant="h3" sx={{ color: 'primary.main', textAlign: 'center' }}>
              {productt?.rating}
            </Typography>
            <Rating
              name="read-only"
              value={productt?.rating}
              readOnly
            />
            <Typography variant="h6" sx={{ color: 'primary.main', textAlign: 'center', mt: 3 }}>
              {productt?.avaliacoes}
            </Typography>
            {Number(productt?.rating) > 4 && (
              <Chip sx={{ mt: 3, mb: 6 }} label="Compra muito segura" color="success" />
            )}
            {Number(productt?.rating) > 1 && Number(productt?.rating) <= 4 && (
              <Chip sx={{ mt: 3, mb: 6 }} label="Compra não confiavel" color="error" />
            )}
            <img style={{ width: 180 }} src="https://blog.mundolipedema.com.br/wp-content/uploads/2022/06/certificado2-1024x1024.png" />
          </Grid>
          <Grid item size={{ xs: 12, md: 9 }}>
            <Typography variant="h6" sx={{ textAlign: 'center' }} gutterBottom>
              Opiniões em destaque
            </Typography>
            {avaliacoesCarregando ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="rectangular" width="100%" height={100} sx={{ mt: 2 }} />
                  </CardContent>
                </Card>
              ))
            ) : (
              productt.reviews.map((review) => (
                <Card key={review.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{review.user}</Typography>
                    <Grid container>
                      <Grid item size={{ xs: 10 }}>
                        <Rating value={Number(review.stars ?? 0)} readOnly />
                      </Grid>
                      <Grid item>
                        <span>{review?.created}</span>
                      </Grid>
                    </Grid>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {review?.photos?.map((p, photoIndex) => (
                        <React.Fragment key={photoIndex}>
                          <br />
                          <img src={p} width={60} height={60} style={{ objectFit: 'cover', cursor: 'pointer' }} onClick={() => setSelectedImage(p)} />
                        </React.Fragment>
                      ))}
                    </div><br />
                    <Typography variant="body2">{review.comment}</Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setSelectedImage(null)}
          aria-label="close"
          sx={{ position: 'fixed', right: 370, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <img src={selectedImage} alt="Imagem ampliada" style={{ width: '100%', height: '80vh', objectFit: 'cover' }} />
      </Dialog>
    </Container>
  );
};

export default ProductPage;