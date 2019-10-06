import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { getGifs, getExtraGifs } from '../actions/gifsActions';
import TextField from '@material-ui/core/TextField';
import GifsContext from '../context/gifs-context';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'block',
    margin: theme.spacing(1)
  },
  button: {
    minWidth: 24
  }
}));

const Search = () => {
  const classes = useStyles();
  const { dispatch } = useContext(GifsContext);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(0);

  const onScrollListener = e => {
    const height = window.innerHeight;
    const { bottom } = document.body.getBoundingClientRect();

    // 2 cells offset
    if (bottom < height + 400) {
      setOffset(offset + 25);
    }
  };

  useEffect(() => {
    if (query.trim()) getExtraGifs(query.trim(), offset, dispatch);
  }, [offset]);

  useEffect(() => {
    window.addEventListener('scroll', onScrollListener);
    return () => {
      window.removeEventListener('scroll', onScrollListener);
    };
  });

  const newQuery = e => {
    e.preventDefault();
    if (query.trim()) {
      getGifs(query.trim(), dispatch);
      setOffset(0);
    }
  };

  return (
    <div>
      <form className={classes.container} onSubmit={newQuery}>
        <TextField value={query} onChange={e => setQuery(e.target.value)} />
        <Button className={classes.button} type='submit' color='primary'>
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
};

export default Search;
