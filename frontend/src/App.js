import React, { Component } from "react"
import ScrollToTop from "./components/ScrollToTop"
import Header from "./components/Header"
import AccountHelp from "./containers/About/AccountHelp"
import City from "./containers/City"
import Home from "./containers/Home"
import Host from "./containers/Host"
import Login from "./containers/User/Login"
import Register from "./containers/User/Register"
import PropertyDetail from "./containers/PropertyDetail"
import UserPage from "./containers/UserPage"
import Footer from "./components/Footer"
import MappedPage from "./containers/MappedPage"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { loginSuccess } from "./containers/User/store/actions"

const Page404 = () => (
    <div align="center">
        <div className="Image-Div">
            <video
                src={require("./assets/images/video.mp4")}
                className="Home-Image"
                autoPlay
                loop
            />
            <div className="NotFound">
                <span>404</span>
                <span>Not Found</span>
            </div>
        </div>
    </div>
)

class App extends Component {
    constructor(props) {
        super(props)
        const logged = localStorage.getItem("logged")
        // check if user has logged in in this session
        if (logged !== null) {
            this.props.loginSuccess(JSON.parse(logged))
        }
    }

    render() {
        return (
            <BrowserRouter>
                <ScrollToTop>
                    <div className="body">
                        <Header/>
                        <Switch>
                            <Route path="/about" exact component={AccountHelp}/>
                            <Route path="/become-a-host" exact component={Host}/>
                            <Route path="/city/:pk" exact component={City}/>
                            <Route path="/" exact component={Home}/>
                            <Route path="/login" exact component={Login}/>
                            <Route path="/register" exact component={Register}/>
                            <Route path="/room/:pk" exact component={PropertyDetail}/>
                            <Route path="/userpage" exact component={UserPage}/>
                            <Route path="/mappedpage" exact component={MappedPage}/>
                            <Route path="/search" exact component={MappedPage}/>
                            <Route component={Page404}/>
                        </Switch>
                        <Footer/>
                    </div>
                </ScrollToTop>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})
const actionCreators = {loginSuccess}
export default connect(mapStateToProps, actionCreators)(App)
