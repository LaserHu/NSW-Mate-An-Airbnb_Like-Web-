import React, { Component } from 'react'
import APIServices from "../../api"
import { Comment, List } from "antd"


const apiServices = new APIServices()

class Reviews extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.roomId = this.props.roomId
        this.reviews = []
    }

    componentDidMount() {
        this.loadReviews()
    }

    loadReviews = async () => {
        try {
            const reviews = await apiServices.getRoomReviews(this.roomId)
            for (let i = 0; i < reviews.length; i++) {
                this.reviews.push({
                    content: reviews[i].content,
                    avatar: reviews[i].avatar,
                    author: reviews[i].username,
                    datetime: reviews[i].time
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <List itemLayout="horizontal"
                      pagination={{
                          onChange: page => {
                              console.log(page)
                          },
                          pageSize: 10
                      }}
                      dataSource={this.reviews}
                      renderItem={item => (
                          <List.Item>
                              <Comment content={item.content} avatar={item.avatar} datetime={item.datetime}
                                       author={item.author}/>
                          </List.Item>
                      )}/>
            </div>
        )
    }
}

export default Reviews