import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';


//Parent Component
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			companyName: "Lotus Gold",
			address: "",
			articles: [],
			router: {
				subnet: "",
				ipAddr: "",
				vpn: ""
			}
		};
		this.fetchCompany = this.fetchCompany.bind(this);
	};

	fetchCompany() {
		fetch("http://127.0.0.1:1313/companies/" + this.state.companyName)
			.then(res => res.json())	
			.then(res => this.setState({
				address: res.address,
				router: res.router
			}))
	};


	componentDidMount() {
		this.fetchCompany();		
	}


	render() {
		 return (
			
			<div id="app-container">
				<Navbar />
				<Topbar companyName={this.state.companyName}/>
				<div id="content-container">			 		
					<Articles setState={this.setState} fetchCompany={this.fetchCompany} companyName={this.state.companyName} articles={this.state.articles}/>
				</div>
			</div>

		 )
	}
};

//Navbar
class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav id="navbar">
				<ul>
					<li><button href="#">Articles</button></li>
					<li><button href="#">Apps</button></li>
					<li><button href="#">Backup</button></li>
					<li><button href="#">Email</button></li>
					<li><button href="#">File Shares</button></li>
					<li><button href="#">Networks</button></li>
					<li><button href="#">Router</button></li>
					<li><button href="#">Servers</button></li>
				</ul>
			</nav>

		)
	}
}

class Topbar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id="topbar">
				<select name="Dropdown" id="">
					<option value="">test</option>
					<option value="">test</option>
					<option value="">test</option>
					<option value="">test</option>
				</select>
				<h1>{this.props.companyName}</h1>
			</div>
		)
	}
}

//Articles Section
class Articles extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newTitle: "",
			newBody: "",
			articles: [] 
		};
		this.updateArticle = this.updateArticle.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleBodyChange = this.handleBodyChange.bind(this);
		this.fetchArticle = this.fetchArticle.bind(this);
	}

	

	handleTitleChange(event) {
		this.setState({
			newTitle: event.target.value,
		});
	}

	handleBodyChange(event) {
		this.setState({
			newBody: event.target.value,
		});
	}

	fetchArticle() {
		fetch("http://127.0.0.1:1313/companies/" + this.props.companyName)
			.then(res => res.json())	
			.then(res => this.setState({
				articles: res.articles
			}))
	};

	updateArticle(event) {
		event.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({company: this.props.companyName, title: this.state.newTitle, content: this.state.newBody})
		};
		
		fetch("http://127.0.0.1:1313/companies/articles/" + this.props.companyName, requestOptions)
			.then(res => res.json())
		
		this.setState({
			articles: [...this.state.articles,{title: this.state.newTitle,content:this.state.newBody}],
			newTitle: "",
			newBody: ""
		});			
	};


	componentDidMount() {
		this.fetchArticle();
	}

	render() {
		

		
		const article = this.state.articles.map((item,index) => 
			<div>
				<h3><a data-toggle="collapse" data-target={"#article-content-"+ item.title.split(" ").join("-") + index.toString()} aria-expanded="false" aria-controls={"article-content-" + item.title + index.toString()}>{item.title}</a></h3>
				<div class="collapse" id={"article-content-" +item.title.split(" ").join("-") + index.toString()}>
					<div class="card card-body">{item.content}</div>
				</div>
			</div>	
		)
		

		return (
			<div id="article-container">
				<form onSubmit={(event) => {this.updateArticle(event); this.props.fetchCompany()}}>
					<input onChange={this.handleTitleChange} value={this.state.newTitle} type="text" />
					<textarea onChange={this.handleBodyChange} value={this.state.newBody} name="" id="" cols="30" rows="10"></textarea>
					<button type="submit">Add new article</button>
				</form>
				<div id="articles">
					<ul>
						{article}
					</ul>
				</div>
			</div>

		)
	}
}


export default App;
