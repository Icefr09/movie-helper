import React from 'react';
import {Table, Icon, Switch, Radio, Form, Divider, Input, Upload, Button, Tag} from 'antd';
const axios = require('axios');
const { Search } = Input;

const expandedRowRender = record => <p>Actors: {record.actor}</p>;
const title = () => 'Search the movies you want here';
const showHeader = true;
const footer = () => 'Add to favorites if you like';
const scroll = { y: 240 };
const pagination = { position: 'bottom' };

class MovieSearch extends React.Component {

    constructor(props) {
        super(props);
        const { data } = this.props.location;
        //console.log(data);
        this.state = {
            bordered: false,
            loading: false,
            pagination,
            size: 'default',
            expandedRowRender,
            title: undefined,
            showHeader,
            footer,
            rowSelection: {},
            scroll: undefined,
            hasData: true,
            tableLayout: undefined,
            searchType: 'movie',
            tableData: undefined,
            file0: undefined,
            userName: data === undefined ? 'hj809@nyu.edu' : data,
        };
        console.log(this.state.userName);
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Genres',
                key: 'genres',
                dataIndex: 'genres',
                render: tags => (
                    <span>
        {tags.map(tag => {
            const genres = ['Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy','Film','Noir','History','Horror','Music','Musical','Mystery','Romance','Sci-Fi','Short','Film','Sport','Superhero','Thriller','War','Western'];
            let colors = ['geekblue', 'green', 'yellow', 'volcano', 'deeppink', 'gold', 'violet', 'tan', 'red'];
            let color = colors[genres.indexOf(tag) % colors.length];
            return (
                <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                </Tag>
            );
        })}
      </span>
                ),
            },
            {
                title: 'Director',
                dataIndex: 'director',
                key: 'director',
            },
            // {
            //     title: 'Actor',
            //     dataIndex: 'actor',
            //     key: 'actor',
            // },
            {
                title: 'Rating',
                dataIndex: 'rating',
                key: 'rating',
            },
            {
                title: 'Year',
                dataIndex: 'year',
                key: 'year',
            },
            {
                title: 'Runtime',
                dataIndex: 'runtime',
                key: 'runtime',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (tconst) => (
                    <span>
        <Button type="primary" onClick={
            () => this.handleAdd(tconst)
        }>Add to Favorites</Button>
      </span>
                ),
            },
        ];
    }

    handleAdd = tconst => {
        const str = 'https://9pu1thbymf.execute-api.us-east-1.amazonaws.com/beta/contact';
        let body = {
            "type": "add",
            "tconst": tconst,
            "email": this.state.userName
        };
        axios.post(str, body).then(response=>{
            console.log(response);
            alert('Successfully added to favorites!');
        })
    }


    handleChange = event => {
        this.setState({
            file0: event.target.files[0],
        })

        let additionalParams0 = {
            headers: {
                //  "content-type": 'application/json'
                'Content-Type' : event.target.files[0]['type'],
                'x-api-key': 'aiBiPdpR7X2eSp6dyWsOF4O2UKgifqeR7ZSlMzoy'
            },
        };

        let reader = new FileReader();
        reader.readAsBinaryString(event.target.files[0]);

        console.log(event.target.files[0]['name']);
        console.log(event.target.files[0]['type']);


        let url = 'https://cimdr1o735.execute-api.us-east-1.amazonaws.com/ice/upload';

        axios.post(url,event.target.files[0],additionalParams0).then(response=>{
            console.log(response.data);
            let tableData = [];
            for (let i = 0; i < response.data['originalTitle'].length; i++) {
                const cur = response.data;
                tableData.push({
                    key: i,
                    name: cur['originalTitle'][i],
                    genres: cur['genres'][i],
                    director: cur['director'][i],
                    actor: `Mr.Tree`,
                    rating: cur['averageRating'][i],
                    year: cur['startYear'][i],
                    runtime: `${cur['runtimeMinutes'][i]} minutes`,
                    action: cur['tconst'][i],
                });
            }
            this.setState({tableData: tableData})
            alert("Search success!");
        });
    }

    handleToggle = prop => enable => {
        this.setState({ [prop]: enable });
    };

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

    handleTableLayoutChange = e => {
        this.setState({ tableLayout: e.target.value });
    };

    handleExpandChange = enable => {
        this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
    };

    handleEllipsisChange = enable => {
        this.setState({ ellipsis: enable });
    };

    handleTitleChange = enable => {
        this.setState({ title: enable ? title : undefined });
    };

    handleHeaderChange = enable => {
        this.setState({ showHeader: enable ? showHeader : false });
    };

    handleFooterChange = enable => {
        this.setState({ footer: enable ? footer : undefined });
    };

    handleRowSelectionChange = enable => {
        this.setState({ rowSelection: enable ? {} : undefined });
    };

    handleScollChange = enable => {
        this.setState({ scroll: enable ? scroll : undefined });
    };

    handleDataChange = hasData => {
        this.setState({ hasData });
    };

    handlePaginationChange = e => {
        const { value } = e.target;
        this.setState({
            pagination: value === 'none' ? false : { position: value },
        });
    };

    handleSearch = e => {
        const str = 'https://neqpw3l852.execute-api.us-east-1.amazonaws.com/test/?filter=' + this.state.searchType + '&keyword=' + e + '&userEmail=' + this.state.userName;
        axios.get(str)
            .then( response => {
                // handle success
                console.log(response);
                let tableData = [];
                for (let i = 0; i < response.data.length; i++) {
                    const cur = response.data[i];
                    tableData.push({
                        key: i,
                        name: cur[0],
                        genres: cur[2],
                        director: cur[3],
                        actor: `Mr.Tree`,
                        rating: cur[4],
                        year: cur[5],
                        runtime: `${cur[6]} hours`,
                        action: cur[1],
                    });
                }
                this.setState({tableData: tableData})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };

    handleSearchTypeChange = e => {
        this.setState({searchType: e.target.value})
    };

    render() {
        const { state } = this;
        return (
            <div>
                <Form
                    layout="inline"
                    className="components-table-demo-control-bar"
                    style={{ marginBottom: 16 }}
                >
                    <Form.Item label="Bordered">
                        <Switch checked={state.bordered} onChange={this.handleToggle('bordered')} />
                    </Form.Item>
                    <Form.Item label="loading">
                        <Switch checked={state.loading} onChange={this.handleToggle('loading')} />
                    </Form.Item>
                    <Form.Item label="Title">
                        <Switch checked={!!state.title} onChange={this.handleTitleChange} />
                    </Form.Item>
                    <Form.Item label="Column Header">
                        <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange} />
                    </Form.Item>
                    <Form.Item label="Footer">
                        <Switch checked={!!state.footer} onChange={this.handleFooterChange} />
                    </Form.Item>
                    <Form.Item label="Expandable">
                        <Switch checked={!!state.expandedRowRender} onChange={this.handleExpandChange} />
                    </Form.Item>
                    <Form.Item label="Checkbox">
                        <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange} />
                    </Form.Item>
                    <Form.Item label="Fixed Header">
                        <Switch checked={!!state.scroll} onChange={this.handleScollChange} />
                    </Form.Item>
                    <Form.Item label="Has Data">
                        <Switch checked={!!state.hasData} onChange={this.handleDataChange} />
                    </Form.Item>
                    <Form.Item label="Ellipsis">
                        <Switch checked={!!state.ellipsis} onChange={this.handleEllipsisChange} />
                    </Form.Item>
                    <Form.Item label="Size">
                        <Radio.Group value={state.size} onChange={this.handleSizeChange}>
                            <Radio.Button value="default">Default</Radio.Button>
                            <Radio.Button value="middle">Middle</Radio.Button>
                            <Radio.Button value="small">Small</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Table Layout">
                        <Radio.Group value={state.tableLayout} onChange={this.handleTableLayoutChange}>
                            <Radio.Button value={undefined}>Unset</Radio.Button>
                            <Radio.Button value="fixed">Fixed</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Pagination">
                        <Radio.Group
                            value={state.pagination ? state.pagination.position : 'none'}
                            onChange={this.handlePaginationChange}
                        >
                            <Radio.Button value="top">Top</Radio.Button>
                            <Radio.Button value="bottom">Bottom</Radio.Button>
                            <Radio.Button value="both">Both</Radio.Button>
                            <Radio.Button value="none">None</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                <div>
                    <Radio.Group value={state.searchType} onChange={this.handleSearchTypeChange}>
                        <Radio.Button value="actor">Actor</Radio.Button>
                        <Radio.Button value="movie">Movie</Radio.Button>
                        <Radio.Button value="genre">Genre</Radio.Button>
                    </Radio.Group>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={this.handleSearch}
                    />
                    <input type="file" onChange={this.handleChange}/>
                </div>
                <Table
                    {...this.state}
                    columns={this.columns.map(item => ({ ...item, ellipsis: state. ellipsis }))}
                    dataSource={state.hasData ? state.tableData : null}
                />
            </div>
        );
    }
}


export default MovieSearch

