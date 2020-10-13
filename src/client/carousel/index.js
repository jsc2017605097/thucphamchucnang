import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import Card from '../card'
import './index.css'
import {GrFormPreviousLink,GrFormNextLink} from 'react-icons/gr'

const noOfItems = 12;
const noOfCards = 3;
const autoPlayDelay = 2000;

export default class Test extends React.Component {

  componentWillMount() {
    this.setState({
      activeItemIndex: 0,
    });

  }

  componentDidMount() {
    this.interval = setInterval(this.tick, autoPlayDelay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => this.setState(prevState => ({
    activeItemIndex: (prevState.activeItemIndex + 1) % (noOfItems - noOfCards + 1),
  }));

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  render() {
    const {
      activeItemIndex,
    } = this.state;
    let number_of_card = 1
    const width_screen = window.screen.width
    if (width_screen > 1024) {
      number_of_card = 4
    }
    else if (width_screen > 768) {
      number_of_card = 2
    }

    return (
      <ItemsCarousel
        // Placeholder configurations
        // enablePlaceholder
        // numberOfPlaceholderItems={5}
        // minimumPlaceholderTime={1000}
        // placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}

        // Carousel configurations
        numberOfCards={number_of_card}
        gutter={12}
        showSlither={true}
        firstAndLastGutter={true}
        freeScrolling={false}

        // Active item configurations
        requestToChangeActive={this.changeActiveItem}
        activeItemIndex={activeItemIndex}
        activePosition={'center'}

        chevronWidth={24}
        rightChevron={<GrFormPreviousLink />}
        leftChevron={<GrFormNextLink />}
        outsideChevron={false}
      >
        {this.props.products.map((p, key) => <Card key={key} product={p} />)}
      </ItemsCarousel>
    );
  }
} 