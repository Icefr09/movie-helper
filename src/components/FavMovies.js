import React from 'react';
import { Table, Divider, Tag } from 'antd';
const axios = require('axios');

const columns = [
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
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (text, record) => (
    //         <span>
    //     <a>Action 一 {record.name}</a>
    //     <Divider type="vertical" />
    //     <a>Delete</a>
    //     <Divider type="vertical" />
    //     <a className="ant-dropdown-link">
    //       More actions <Icon type="down" />
    //     </a>
    //   </span>
    //     ),
    // },
];


class FavMovies extends React.Component {
    constructor(props) {
        super(props);
        const { data } = this.props.location;
        //console.log(data);
        this.state = {
            tableData: [],
            userName: data === undefined ? 'hj809@nyu.edu' : data
        }
        console.log(this.state.userName);
    }

    componentDidMount() {
        const str = 'https://9pu1thbymf.execute-api.us-east-1.amazonaws.com/beta/contact';
        let body = {
            "type": "read",
            "tconst": "",
            "email": this.state.userName
        };
        console.log(body);
        axios.post(str, body).then(response=>{
            console.log(response);
            let tableData = [];
            for (let i = 0; i < response.data.body.length; i++) {
                const cur = response.data.body[i];
                tableData.push({
                    key: i,
                    name: cur[0],
                    genres: cur[2],
                    director: cur[3],
                    actor: `Mr.Tree`,
                    rating: cur[4],
                    year: cur[5],
                    runtime: `${cur[6]} hours`
                });
            }
            this.setState({tableData: tableData})
        });
    }

    render() {

        return (
            <div>
                <Table columns={columns} dataSource={this.state.tableData} />
            </div>
        )
    }
}

export default FavMovies

