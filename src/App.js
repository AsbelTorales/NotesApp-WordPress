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



const initialState = {
  posts: JSON.parse(localStorage.getItem('posts')) || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'TOGGLE_CHECKBOX':
      return {
        ...state,
        posts: state.posts.map((post, index) =>
          index === action.payload
            ? { ...post, checked: !post.checked }
            : post
        ),
    };

    case 'MARK_ALL_AS_CHECKED':
      return {
        ...state,
        posts: state.posts.map(post => ({ ...post, checked: true })),
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //const [posts, setPosts] = useState([]);

  console.log(state)

  useEffect(() => {
    Axios.get('https://fernandafamiliar.soy/wp-json/wp/v2/posts/').then((res) => {
      const postsWithReadStatus = res.data.map(post => ({ ...post, checked: false }));
      dispatch({ type: 'SET_POSTS', payload: postsWithReadStatus });
      //setPosts(res.data);
    });
  }, []);

  useEffect(() => {
    //Almacena las notas en el almacenamiento local del navegador 
    localStorage.setItem('posts', JSON.stringify(state.posts)); 
  }, [state.posts]);

  const toggleCheckbox = (index) => {
    dispatch({ type: 'TOGGLE_CHECKBOX', payload: index });
  };

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
