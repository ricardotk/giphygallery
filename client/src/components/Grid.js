import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GifsContext from '../context/gifs-context';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import useWindowWidth from '../hooks/useWindowWidth';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '100%',
    height: '100%'
  }
}));

const Grid = () => {
  const width = useWindowWidth();
  const classes = useStyles();
  const { gifs } = useContext(GifsContext);

  const getGridListCols = () => (width <= 250 ? 1 : Math.ceil(width / 250));

  return (
    <div className={classes.root}>
      {gifs && gifs.length > 0 ? (
        <GridList cellHeight={200} className={classes.gridList} cols={getGridListCols()}>
          {gifs.map(gif =>
            gif ? (
              <GridListTile key={gif.id} cols={gif.width > 250 ? 2 : 1}>
                <img src={gif.url} alt={gif.title} />
              </GridListTile>
            ) : null
          )}
        </GridList>
      ) : null}
    </div>
  );
};

export default Grid;
