// Importación de App.css y bibliotecas necesarias
import './App.css';
import Axios from 'axios';
import { useEffect, useState, useReducer } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { format } from 'date-fns';
import { Box } from '@mui/material';


// Estado inicial 
const initialState = {
  posts: JSON.parse(localStorage.getItem('posts')) || [],
};

// Función reducer para manejar el estado
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':  // Establece las publicaciones
      return { ...state, posts: action.payload };
    case 'TOGGLE_CHECKBOX': // Alterna el estado de la casilla de verificación
      return {
        ...state,
        posts: state.posts.map((post, index) =>
          index === action.payload
            ? { ...post, checked: !post.checked }
            : post
        ),
    };

    case 'MARK_ALL_AS_CHECKED': // Marca todas las publicaciones como leídas
      return {
        ...state,
        posts: state.posts.map(post => ({ ...post, checked: true })),
      };
    default:
      return state;
  }
};

// Componente principal de la aplicación
function App() {
  const [state, dispatch] = useReducer(reducer, initialState); // Inicializa el estado y el despachador
  //const [posts, setPosts] = useState([]); 

  console.log(state)

// Llamada a la API de WordPress para obtener las publicaciones al montar el componente
  useEffect(() => {
    Axios.get('https://fernandafamiliar.soy/wp-json/wp/v2/posts/').then((res) => {
      const postsWithReadStatus = res.data.map(post => ({ ...post, checked: false }));
      dispatch({ type: 'SET_POSTS', payload: postsWithReadStatus });
      //setPosts(res.data);
    });
  }, []);

// Guarda el estado actual de las publicaciones en el almacenamiento local cada vez que cambia
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(state.posts)); 
  }, [state.posts]);

// Función para alternar el estado de la casilla de verificación de una publicación específica
  const toggleCheckbox = (index) => {
    dispatch({ type: 'TOGGLE_CHECKBOX', payload: index });
  };

// Función para marcar todas las publicaciones como leídas
  const markAllAsChecked = () => {
    dispatch({ type: 'MARK_ALL_AS_CHECKED' });
  };

  return (
<div style={{ padding: '20px' }}>
  <Box mb={2} display="flex" justifyContent="center">
    <Button variant="contained" color="primary" onClick={markAllAsChecked}>
        Marcar todas como leidas
    </Button>
  </Box>
  <Container fixed>
    <Grid container spacing={3} justifyContent="center">
      {state.posts.map((post, index) => (
      <Grid item xs={12} key={index} sm={6} md={4}>
        <Card 
         sx={{ maxWidth: 345, boxShadow: 3, ':hover':{ boxShadow: 20,} }}>
          <CardMedia
             sx={{ height: 200 }}
             src= {post.jetpack_featured_media_url}
             alt={post.title.rendered}
             title={post.title.rendered}
             component='img'
          />
          
          <CardContent>
            
                <Typography
                  color="textSecondary"
                  gutterBottom
                  dangerouslySetInnerHTML={{__html: post.title.rendered}}/>

                <Typography
                  variant="body2"
                  component="p"
                  dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>

                <CardActions>
                  <Button href={post.link} target="_blank" rel="noopener noreferrer" size="small">Leer más</Button>
                </CardActions>

                  <div style={{ marginTop: '1.5rem' }}>
                    <Typography
                      component="p"
                      variant="caption"
                      color="textSecondary"
                      gutterBottom
                  
                    >
                    Publicación: {format(new Date(post.date), 'dd/MM/yyyy')} - Hora: {format(new Date(post.date), 'HH:mm:ss')}
                    </Typography>


                    <Typography
                      component="p"
                      variant="caption"
                      color="textSecondary"
                      gutterBottom
                      
                    >
                      Modificación: {format(new Date(post.date), 'dd/MM/yyyy')} - Hora: {format(new Date(post.date), 'HH:mm:ss')}
                    </Typography>
                  </div>

                  <FormControlLabel
                      control={
                      <Checkbox
                          checked={post.checked}
                          onChange={() => toggleCheckbox(index)}
                      />
                      }
                      label="Marcar como leído"

                    />

          </CardContent>
        </Card>
      </Grid>
     ))}
    </Grid>
  </Container>
</div>
  );
}
export default App;
