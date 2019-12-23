import React from 'react';
import {Button, Layout, Form, Table, Menu, Breadcrumb, Icon} from 'antd';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import FavMovies from "./components/FavMovies";
import MovieSearch from "./components/MovieSearch";
import FeaturedMovie from "./components/FeaturedMovie";
import NearbyTheatre from "./components/NearbyTheatre";

const apigClientFactory = require('aws-api-gateway-client').default;

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

function getUrlVars() {
    const vars = {};
    //console.log(window.location.href)
    window.location.href.replace(/[#?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
}

class App extends React.Component {
    constructor(props) {
        super(props);
        let idToken = '';
        let userName = undefined;
        if (getUrlVars()['id_token'] !== undefined) {
            idToken = getUrlVars()['id_token'];
            let jwt = parseJwt(idToken);
            userName = jwt["email"];
        }

        this.state = {
            message: "haha",
            collapsed: false,
            userName: userName === undefined ? 'hj809@nyu.edu' : userName,
        };

    }

    componentDidMount() {
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        return (
            <Router>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo"/>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Icon type="pie-chart"/>
                                <span>Search Movie</span>
                                <Link to={{
                                    pathname: "/movieSearch",
                                    data: this.state.userName // your data array of objects
                                }}/>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="desktop"/>
                                <span>Private Favorites</span>
                                <Link to={{
                                        pathname: "/favMovies",
                                        data: this.state.userName // your data array of objects
                                }}/>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="desktop"/>
                                <span>Personal recommendations</span>
                                <Link to={{
                                    pathname: "/featuredMovies",
                                    data: this.state.userName // your data array of objects
                                }}/>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="desktop"/>
                                <span>Nearby Theatre</span>
                                <Link to="/nearbyTheatre"/>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}/>
                        <Content style={{margin: '0 16px'}}>
                            <div>Welcome {this.state.userName} </div>
                            <Route path="/favMovies" component={FavMovies} />
                            <Route path="/movieSearch" component={MovieSearch}/>
                            <Route path="/featuredMovies" component={FeaturedMovie}/>
                            <Route path="/nearbyTheatre" component={NearbyTheatre}/>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default App;
