import React from 'react';
import {Carousel, Card, Avatar, Icon} from 'antd';
const { Meta } = Card;
const axios = require('axios');

class FeaturedMovie extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.next = this.next.bind(this);
    //     this.previous = this.previous.bind(this);
    //     this.carousel = React.createRef();
    // }
    constructor(props) {
        super(props);
        const {data} = this.props.location;
        //console.log(data);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carousel = React.createRef();
        this.state = {
            userName: data === undefined ? 'hj809@nyu.edu' : data,
        };
        console.log(this.state.userName);
    }

    next() {
        this.carousel.next();
    }
    previous() {
        this.carousel.prev();
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


    render() {
        const props = {
            autoplay: true,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div>
                <Icon type="left-circle" onClick={this.previous} />
                <Carousel ref={node => (this.carousel = node)} {...props}>
                    <div>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="img1"
                                    src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9ada75bf-aba2-4259-b1ca-16d33469a46f/14.jpg"
                                />
                            }
                            actions={[
                                <Icon type="setting" key="setting" />,
                                <Icon type="like" key="like" onClick={
                                    () => this.handleAdd('tt2527338')
                                }/>,
                                <Icon type="ellipsis" key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title="Star Wars"
                                description="This is the description"
                            />
                        </Card>
                    </div>
                    <div>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="img2"
                                    src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/529fb627-f365-4d49-83a2-4fb44b375282/15.jpg"
                                />
                            }
                            actions={[
                                <Icon type="setting" key="setting" />,
                                <Icon type="like" key="like" onClick={
                                    () => this.handleAdd('tt0358273')
                                }/>,
                                <Icon type="ellipsis" key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title="Walk the line"
                                description="This is the description"
                            />
                        </Card>
                    </div>
                    <div>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="img3"
                                    src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4e382411-3c56-4da1-bb26-630fa185182d/13.jpg"
                                />
                            }
                            actions={[
                                <Icon type="setting" key="setting" />,
                                <Icon type="like" key="like" onClick={
                                    () => this.handleAdd('tt0462322')
                                }/>,
                                <Icon type="ellipsis" key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title="Grindhouse"
                                description="This is the description"
                            />
                        </Card>
                    </div>
                    <div>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="img4"
                                    src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f3367401-bd09-4df0-9d8d-6b0deb7a450e/4.jpg"
                                />
                            }
                            actions={[
                                <Icon type="setting" key="setting" />,
                                <Icon type="like" key="like" onClick={
                                    () => this.handleAdd('tt0094017')
                                }/>,
                                <Icon type="ellipsis" key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title="The Spirit "
                                description="This is the description"
                            />
                        </Card>
                    </div>
                </Carousel>
                <Icon type="right-circle" onClick={this.next} />
            </div>
        )
    }
}

export default FeaturedMovie
