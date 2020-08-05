import axios from 'axios'

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'

// const prefix = "https://dwo0tbj14j3pa.cloudfront.net"
const prefix = "http://localhost:9000"

export default class APIServices {
    getRoom(pk) {
        const url = `${prefix}/api/room/${pk}`
        return axios.get(url).then(response => response.data)
    }

    getCity(city) {
        const url = `${prefix}/api/room/search?location=${city}`
        return axios.get(url).then(response => response.data)
    }

    getRoomAvailability(pk) {
        const url = `${prefix}/available/${pk}`
        return axios.get(url).then(response => response.data)
    }

    getSearchResults(city, num_guests) {
        const url = `${prefix}/api/room/search?location=${city}&guest=${num_guests}`
        return axios.get(url).then(response => response.data)
    }

    getRoomReviews(pk) {
        const url = `${prefix}/api/review/${pk}`
        return axios.get(url).then(response => response.data)
    }

    userLogin(email, password) {
        const url = `${prefix}/auth`
        const body = {
            email: email,
            password: password
        }
        console.log(body)
        return axios.post(url, body)
    }

    userRegister(email, username, password) {
        const url = `${prefix}/register`
        const body = {
            username: username,
            email: email,
            password: password
        }
        return axios.post(url, body)
    }

    userResetPassword(email, oriPassword, newPassword) {
        const url = `${prefix}/reset`
        const body = {
            email: email,
            originalPassword: oriPassword,
            newPassword: newPassword
        }
        return axios.put(url, body)
    }

    reserve(email, checkIn, checkOut, roomId, jwt) {
        const url = `${prefix}/order`
        const body = {
            roomId: roomId,
            checkin: checkIn,
            checkout: checkOut,
            email: email
        }
        return axios.post(url, body, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
    }

    postReview(email, id, review, jwt) {
        const url = `${prefix}/api/review`
        const body = {
            email: email,
            content: review,
            roomId: id
        }
        console.log(body)
        return axios.post(url, body,
            {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
        )
    }

    saveRoom(email, roomId, jwt) {
        const url = `${prefix}/like`
        const body = {
            email: email,
            roomId: roomId,
        }
        return axios.post(url, body, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
        )
    }

    unsaveRoom(email, roomId, jwt) {
        const url = `${prefix}/dislike`
        const body = {
            email: email,
            roomId: roomId,
        }
        return axios.post(url, body, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
        )
    }

    isSaved(email, roomId, jwt) {
        const url = `${prefix}/like/check?email=${email}&roomId=${roomId}`
        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        }).then(response => response.data)
    }

    userOrderHistory(email) {
        const url = `${prefix}/order/u/${email}`
        return axios.get(url).then(response => response.data)
    }

    userSavedRooms(email, jwt) {
        const url = `${prefix}/like/${email}`
        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        }).then(response => response.data)
    }


    host(name, introduction, location, price, amenities, interior, capacity, images, email, jwt) {
        const url = `${prefix}/host`
        const body = {
            name: name,
            introduction: introduction,
            location: location,
            price: price,
            amenities: amenities,
            interior: interior,
            guest: capacity,
            images: images,
            email: email
        }
        console.log(body)
        return axios.post(url, body, {
            'Authorization': `Bearer ${jwt}`,
        })
    }

    myHosts(email) {
        const url = `${prefix}/host/${email}`
        return axios.get(url).then(response => response.data)
    }
}
