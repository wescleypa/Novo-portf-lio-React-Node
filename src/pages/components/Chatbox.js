import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled, Paper, Avatar, Typography, CircularProgress } from '@mui/material';
import Camila from '../../assets/images/camila.webp';
import axios from 'axios';

export default function ChatBox({ isFixed }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const listRef = useRef(null);

  const MessageBubble = styled(Paper)(({ theme, isUser }) => ({
    maxWidth: '70%',
    padding: theme.spacing(1, 2),
    borderRadius: isUser ? '20px 20px 0 20px' : '20px 20px 20px 0',
    backgroundColor: isUser ? theme.palette.primary.main : theme.palette.text.secondary,
    color: isUser ? theme.palette.primary.contrastText : theme.palette.background.paper,
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    marginBottom: theme.spacing(1),
  }));

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
      text: inputValue,
      isUser: true,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue('');

    setLoading(true);

    try {
      const context = messages
        .slice(-5)
        .map((msg) => ({ role: msg.isUser ? 'user' : 'assistant', content: msg.text }));

      context.push({ role: 'user', content: inputValue });

      const response = await axios.post('https://api.souwescley.com:3001/ia', { content: context });

      const iaResponse = {
        text: response.data.result,
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, iaResponse]);
    } catch (error) {
      console.error('Erro ao enviar mensagem para a IA:', error);
      const errorMessage = {
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    const initialMessage = {
      text: `Olá, sou a <b>Camila</b>, Inteligência artificial. Como posso sanar suas dúvidas referente à Wescley, hoje?`,
      isUser: false,
    };
    setMessages([initialMessage]);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
      }}
    >
      <List
        ref={listRef}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          maxHeight: '60vh',
          minHeight: '60vh',
          mb: 2,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'background.paper',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        {messages.map((message, index) => (
          <ListItem
            key={index}
            sx={{
              justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            {!message.isUser && (
              <Avatar sx={{ bgcolor: 'primary.light', mr: 1 }}>
                <img width="100%" src={Camila} alt="Camila" />
              </Avatar>
            )}
            <MessageBubble isUser={message.isUser}>
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  />
                }
              />
            </MessageBubble>
            {message.isUser && (
              <Avatar sx={{ bgcolor: 'primary.main', ml: 1 }} />
            )}
          </ListItem>
        ))}

        {loading && (
          <ListItem
            sx={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.light', mr: 1 }}>
              <img width="100%" src={Camila} alt="Camila" />
            </Avatar>
            <MessageBubble isUser={false}>
              <ListItemText
                primary={
                  <Typography component="span">
                    <CircularProgress size={16} sx={{ mr: 1 }} />
                    Pensando...
                  </Typography>
                }
              />
            </MessageBubble>
          </ListItem>
        )}

        <div ref={messagesEndRef} />
      </List>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          width: '100%',
          position: isFixed ? 'fixed' : 'static',
          bottom: isFixed ? 10 : 'auto',
          p: 2,
          pr: 4,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite uma mensagem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
          sx={{
            bgcolor: 'text.secondary',
            borderRadius: '10px',
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={loading}
          sx={{
            height: '55px',
          }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
}