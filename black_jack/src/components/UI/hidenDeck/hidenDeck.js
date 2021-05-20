import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import  makeStyles from '@material-ui/core/styles/makeStyles';
import Deck from '../../../components/TableBoard/Deck/Deck';


const testDeck = [
  {
    value: 5, symbol: "diamond", Ace: false
  },
  {
    value: 12, symbol: "diamond", Ace: false
  },
  {
    value: 2, symbol: "diamond", Ace: false
  }
];

testDeck.activeDeck = true;

testDeck.deckFinished = false;

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',

  },
  paper: {
    padding: theme.spacing(1),
    marginTop:theme.spacing(1),
    boxShadow:theme.shadows[12],
    borderRadius:'2px',
    backgroundColor:'rgb(228, 228, 228)'
  },
}));

export default function HidenDeck() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <div
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        Hover with a Popover.
      </div>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        elevation={1}
        children={'aaa'}
        transitionDuration={500}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',

        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
      
          <Deck
            deckCards = {testDeck[0]}
            playedHand
            noHideDeck
          >
          </Deck>
          
      </Popover>
    </div>
  );
}