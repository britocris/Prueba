import './App.css';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Container, Row } from 'reactstrap'
import React, {useState, useEffect} from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import SearchAppBar from './SearchAppBar'


const initialState =  {
  paginInput: 1,
  fetched: false,
  urlBase: 'https://reqres.in/api/users?page=',
  pagin: 1,
  data: {},
  users: [],
  cadena1: "en5 4terremoto NAS1A regi2stró L0a M6arte u3n",
  cadena2: "ma2r ma5rinos al1 tr3es Dev0olvieron lo4bos "
}

const useStyles = makeStyles((Theme) =>
  createStyles({
    progress: {
      margin: Theme.spacing(2),
    },
    card: {
      marginTop: 15,
      maxWidth: 150,
    },
    media: {
      height: 140,
    },
    button: {
      margin: Theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }),
);

function App() {

  const [state, setState] = useState(initialState);
  const {paginInput, fetched, urlBase, pagin, data, users, cadena1, cadena2} = state;
  const classes = useStyles();

  useEffect(() => {
    function fetchUsers() {
      fetch(urlBase + pagin)
      .then(function(response) {
        return response.json();
      })
      .then(function(users) {
        setState({
          ...state,
          fetched: true,
          data: users,
          users: users.data
        })
      });
    }
    fetchUsers();
  }, [pagin])

  function countNameLetters() {
    let acumulado = 0
    users.map((user) => {
      if(user.first_name.length + user.last_name.length > 12) {
        acumulado = acumulado + 1;
      }
    }) 
    return ((acumulado / data.per_page) * 100).toFixed(2) ;
  }

  function handlerChangePaginInput(e) { 
    setState({
      ...state,
      [e.target.name] : e.target.value,
      pagin: parseInt(e.target.value)
    })
  }

  function ordenarString (cadenaDesordenada) {
    let newCadena = cadenaDesordenada.split(" ")
    let cadenaOrdenada = ""
    for(let i = 0; i < newCadena.length; i++) {
      newCadena.find((elemento) => {
        if(elemento.includes(i)) {
          cadenaOrdenada = cadenaOrdenada + elemento + " "
        }
      });
    }
    return cadenaOrdenada;
  }

  return (
    <>
      <SearchAppBar/>
      { fetched ? 
      <Container>
        <Row>
          <Grid container justify="center" spacing={2}>
            {users.map((user, index) => (
              <Grid lg={2} md={2} sm={4} xs={6} item key={index} >
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={user.avatar}
                    />
                    <CardContent>
                      <h6 style={{ fontWeight: 500 }} className="tipografy">
                        {user.first_name} {user.last_name}
                      </h6>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid >
            ))}
          </Grid>
        </Row>
        
        <div className="percentContainer">
          <label> Porcentaje mayor de 12 caracteres: {countNameLetters()}% </label>
        </div>

        <Pagination aria-label="Page navigation example" className="pagination">
          <PaginationItem disabled={ pagin <= 1 }>
            <PaginationLink onClick={ () => setState({...state, pagin: pagin - 1, fetched: false })} >
              Prev
            </PaginationLink>
          </PaginationItem>
          <input type="number" max={data.total_pages} min={1}  value={pagin} onChange={(e) => handlerChangePaginInput(e, paginInput)} name="paginInput" id=""/>
          <PaginationItem disabled={pagin >= data.total_pages} >
            <PaginationLink onClick={ () => setState({...state, pagin: pagin + 1, fetched: false })} >
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </Container> :
      <div className="spinner"> 
        <CircularProgress className={classes.progress} />
      </div>
    }
    </>
  );
}

export default App;
