import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom';
import { Button, Card, Grid, Icon, Image, Item, Label, Menu } from 'semantic-ui-react';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import _ from 'lodash';

class App extends Component {
	render() {
		return (
			<div className="container">
				<div className="cars-wrapper">
					<div className="row app-title">
						<h1>Hello World</h1>
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
					</div>
				</div>
			</div>
		);
	}
}

export default App;
