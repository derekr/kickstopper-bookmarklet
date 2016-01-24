import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import fetch from 'isomorphic-fetch'

import css from './styles.css'

const fetchKSDetails = (url, callback) => {
    // var url = 'https%3A%2F%2Fwww.kickstarter.com%2Fprojects%2F1587081065%2Fnothing-to-hide-the-documentary%3Fref%3Dhome_potd&&'
    // var url = encodeURIComponent('https://www.kickstarter.com/projects/stinkycheeseman/a-collection-of-dad-poems?ref=home_popular')
    // var url = encodeURIComponent('https://www.kickstarter.com/projects/goodgoodcomedy/good-good-comedy-theatre-philadelphia-pa?ref=home_popular')
    // var url = encodeURIComponent('https://www.kickstarter.com/projects/1587081065/nothing-to-hide-the-documentary')
    // var url = 'https://www.kickstarter.com/projects/657685639/where-is-the-dumpling-emoji'
    var url = 'https://www.kickstarter.com/projects/5794927/weed-ramen-and-hemp-ramen-in-chelseany'
    console.log(url)
    const _url = `https://api.import.io/store/connector/d7f013d1-d0d9-4d19-a0be-797ad2cb404b/_query?input=webpage/url:${url}&_apikey=0a3891324b7044bf9fc36b8294051a05388f90666b9ef7b43d8750bbbf5360fcb779954f920498a6d8c14092f4ad87077dd9645299a361bf115df2b108744b5962953a5b70b3828072cae387c1275f6d`

    fetch(_url, { credentials: 'include' })
        .then(res => res.json())
        .then(json => callback(null, json.results[0]))
}

const Suggestions = () => {
    const _suggestions = [
        { title: 'Facebook Ads Defamation', desc: 'Launch a Facebook Ad campaign...', amount: 50 },
        { title: 'Cease + Desist', desc: 'Let someone smarter figure out how to legally put an end to this shit...', amount: 10000 },
        { title: 'Hire North Korean Hackers' }
    ]

    return (
        <div className="suggestion-wrapper">{_suggestions.map((s, i) => {
            return (<div key={ i } className="suggestion">
                - <strong>{ s.title }</strong>
            </div>)
        })}</div>
    )
}

const Project = (props) => {
    const message = props.backers <= 0
        ? <p className="zerobackers"><strong>0</strong> backers! THANK GOD!!!</p>
        : <p>And help <strong>{ props.backers }</strong> souls save <strong>{ props.goal }</strong> bucks.</p>

    return (
        <div>
            <div className='h-flex'>
                <div className="img-wrapper">
                    <h1><span className="light-text">Stop:</span> { props.campaign_name }</h1>
                    <img className="c-img" src="https://ksr-ugc.imgix.net/assets/004/987/562/8942877408417c9b816cdadda0d218f1_original.png?v=1448602014&w=680&fit=max&auto=format&lossless=true&s=dc2d1887cc4e77b6c8a6954dcae8f507" />
                    { message }
                </div>
                <div>
                    <label className="mylabel">Why should we stop this project?</label>
                    <textarea placeholder="Isn't it obvious?" className="mytextarea"></textarea>

                    <button className="mysubmitbtn" onClick={ props.onSubmit }>Kickstop This Project</button>
                </div>
            </div>

        </div>
    )
}

const Success = () => {
    return (
        <div>
            <h1>Thanks for your non-support!</h1>

            <p>
                We'll look in to raising money for things like:
            </p>

            <Suggestions />

            <p>
                To help top this project once and for all.
            </p>
        </div>
    )
}

const App = React.createClass({
    getInitialState() {
        return { project: null, success: false }
    },

    componentDidMount() {
        const site = window.location.href

        // @TODO: check kickstarter vs gofundme

        fetchKSDetails(site, (err, data) => {
            this.setState({ project: data })
        })
    },

    handleSubmit() {
        this.setState({ success: true })
    },

    render() {
        const modalStyles = {
            zIndex: 100000
        }

        return (
            <Modal isOpen className="wrapper" style={{ content: modalStyles }}>
              { this.state.success ? <Success /> : <Project { ...this.state.project } onSubmit={ this.handleSubmit } /> }
            </Modal>
        )
    }
})

var target = document.createElement("DIV")
document.body.appendChild(target)

ReactDOM.render(<App />, target)
