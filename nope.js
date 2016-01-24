import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import fetch from 'isomorphic-fetch'

const fetchKSDetails = (url, callback) => {
    // var url = 'https%3A%2F%2Fwww.kickstarter.com%2Fprojects%2F1587081065%2Fnothing-to-hide-the-documentary%3Fref%3Dhome_potd&&'
    // var url = encodeURIComponent('https://www.kickstarter.com/projects/stinkycheeseman/a-collection-of-dad-poems?ref=home_popular')
    // var url = encodeURIComponent('https://www.kickstarter.com/projects/goodgoodcomedy/good-good-comedy-theatre-philadelphia-pa?ref=home_popular')
    // var url = encodeURIComponent('https://www.kickstarter.com/projects/1587081065/nothing-to-hide-the-documentary')
    // var url = 'https://www.kickstarter.com/projects/657685639/where-is-the-dumpling-emoji'
    console.log(url)
    const _url = `https://api.import.io/store/connector/15fafabc-8965-4603-a544-92fe2819c2b3/_query?input=webpage/url:${url}&_apikey=0a3891324b7044bf9fc36b8294051a05388f90666b9ef7b43d8750bbbf5360fcb779954f920498a6d8c14092f4ad87077dd9645299a361bf115df2b108744b5962953a5b70b3828072cae387c1275f6d`

    fetch(_url, { credentials: 'include' })
        .then(res => res.json())
        .then(json => callback(null, json.results[0]))
}

const mapProject = (src) => {
    return {
        title: src['campaign_name/_text'],
        img: src.user_image
    }
}

const Suggestions = () => {
    const _suggestions = [
        { title: 'Facebook Ads', desc: 'Launch a Facebook Ad campaign...', amount: 50 },
        { title: 'Hire Lawyer', desc: 'Let someone smarter figure out how to legally put an end to this shit...', amount: 10000 }
    ]

    return (
        <div>{_suggestions.map((s, i) => {
            return (<div key={ i }>
                <strong>{ s.title }</strong>
                <p>{ s.desc }</p>
            </div>)
        })}</div>
    )
}

const Project = ({ title, img }) => {
    return (
        <div>
            Loaded!!! { title }
            <img src={ img } />
            You'll want to raise <strong>$500</strong>.

            <Suggestions />

            <button>Stop { title }</button>
        </div>
    )
}

const App = React.createClass({
    getInitialState() {
        return { project: null }
    },

    componentDidMount() {
        const site = window.location.href

        // @TODO: check kickstarter vs gofundme

        fetchKSDetails(site, (err, data) => {
            this.setState({ project: mapProject(data) })
        })
    },

    render() {
        return (
            <Modal isOpen>
              { this.state.project ? <Project { ...this.state.project } /> : 'Fetching project…' }
            </Modal>
        )
    }
})

var target = document.createElement("DIV")
document.body.appendChild(target)

ReactDOM.render(<App />, target)
