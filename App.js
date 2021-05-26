import logo from './logo.svg';
import './App.css';
import {Button, ButtonGroup, TextField} from '@material-ui/core';
import {useEffect, useState} from 'react';
import { loadMarket, loadMarkets } from './Api';

function App() {
    const [user, setUser] = useState(null);
    const [markets, setMarkets] = useState([]);
    const [market, setMarket] = useState(null);
    const defaultMarket = 'snu-won';
    console.log(markets)
    if(market) console.log(market)
    useEffect(() => {
      loadMarkets()
          .then(marketObjects => {
              setMarkets(Object.keys(marketObjects).map(key => marketObjects[key]));
          })
    }, []);

    useEffect(() => {
        loadMarket(defaultMarket)
            .then(_market => {
                setMarket(_market);
            })
    }, []);


  return (
  <div>
    <header>

      <div><h2>logo</h2></div>
      <h2>Snu-Coin</h2>
      <div className="login-panel">
          {user ? <span> Welcome! {user.name}</span>
          :
              <div>
                  <h3>Please Login</h3>
                  <form className="login-form" noValidate autoComplete="off">
                      <TextField size="small" id="filled-basic" label="ID" variant="filled" />
                      <TextField size="small" id="filled-basic" label="password" variant="filled" type="password"/>
                      <Button type="submit" variant="contained" color="primary">Login</Button>
                  </form>
              </div>
          }

      </div>
    </header>
      <div id="contents">
          <ButtonGroup color="primary" aria-label="outlined primary button group">
              {markets.map(market =>

                  <Button>{market.name}</Button>
              )}
          </ButtonGroup>
          {market &&
          <div className="market">
              <div id="orderBooks">
                  {
                    market.orderBooks.map(orderBook => {
                        return (<div key={orderBook._id}>
                            {orderBook._id} : {orderBook.totalQuantity}
                        </div>);
                    })
                  }
              </div>
              <div >
                  <form className="create-order">
                      <Button>Buy</Button><Button>Sell</Button>
                      <TextField size="small" id="filled-basic" label="price" variant="filled" type="number" />
                      <TextField size="small" id="filled-basic" label="quantity" variant="filled" type="number" />
                      <Button type="submit">Order</Button>
                  </form>
              </div>
          </div>
          }

      </div>
  </div>
  );

}

export default App;
