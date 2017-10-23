import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom';
import { Button, Card, Container, Grid, Header, Icon, Image, Item, Label, Menu } from 'semantic-ui-react';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import _ from 'lodash';

class App extends Component {
	render() {
		return (
			<Container>
				<Header as="h1" textAlign="center">Hello World</Header>
				<Grid columns={3} divided>
					<Grid.Row>
						<Grid.Column>
							Lorem ipsum dolor sit amet.
								</Grid.Column>
						<Grid.Column>
							Lorem ipsum dolor sit amet.
								</Grid.Column>
						<Grid.Column>
							Lorem ipsum dolor sit amet.
								</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}

export default App;
