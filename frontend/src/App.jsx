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
			nav: "companies",
			companyName: "Lotus Gold",
			address: "",
			articles: [],
			router: {
				subnet: "",
				ipAddr: "",
				vpn: ""
			},
			companyList: []
		};
		this.fetchCompany = this.fetchCompany.bind(this);
		this.updateCompany = this.updateCompany.bind(this);
		this.changeNav = this.changeNav.bind(this);
		this.fetchAllCompanies = this.fetchAllCompanies.bind(this);
	};

	fetchCompany() {
		fetch("http://127.0.0.1:1313/companies/" + this.state.companyName)
			.then(res => res.json())	
			.then(res => this.setState({
				address: res.address,
				router: res.router
			}))
	};

	fetchAllCompanies() {
		fetch("http://127.0.0.1:1313/companies/")
			.then(res => res.json())
			.then(res => this.setState({
				companyList: res
			}))
	};

	updateCompany(e) {
		this.setState({
			companyName: e.target.value
		});
	}

	changeNav(navValue) {
		this.setState({
			nav: navValue
		});
	}

	componentWillMount() {
		this.fetchCompany();
		this.fetchAllCompanies();	
	}

	componentWillUpdate() {
		this.fetchCompany();
	}

	render() {

		if (this.state.nav === "companies") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} updateCompany={this.updateCompany} companyName={this.state.companyName}/>
					<div id="content-container">
						<Companies companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} updateCompany={this.updateCompany} companyName={this.state.companyName} />
					</div>
				</div>
		 	)
		} else if (this.state.nav === "articles") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} updateCompany={this.updateCompany} companyName={this.state.companyName}/>
					<div id="content-container">			 		
						<Articles setState={this.setState} fetchCompany={this.fetchCompany} companyName={this.state.companyName} articles={this.state.articles}/>
					</div>
				</div>
		 	)
		}
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
					<li className="nav-button" onClick={() => this.props.changeNav("companies")}>
						<span className="material-icons">business</span>
						<h5>Companies</h5>
					</li>
					<li className="nav-button" onClick={() => this.props.changeNav("articles")}>
						<span className="material-icons">book</span>
						<h5>Articles</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons">apps</span>
						<h5>Apps</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons">cloud_upload</span>
						<h5>Backup</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons">mail</span>
						<h5>Email</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons">folder</span>
						<h5>File Shares</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons">wifi</span>
						<h5>Networks</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons">storage</span>
						<h5>Servers</h5>
					</li>
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
		const allCompanies = this.props.companyList.map((item) =>
			<option value={item.name}>{item.name}</option>
		)  
		
		return (
			<div id="topbar">
				<div id="logo">
					<span className="material-icons">pets</span>
					<h1>Auri</h1>
				</div>
				<input type="text" />
				<select name="Dropdown" id="Companies" value="" onChange={this.props.updateCompany}>
					<option value="">{this.props.companyName}</option>
					{allCompanies}
				</select>
				<span class="material-icons">
					account_circle
				</span>
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
			articles: [],
			companyName: this.props.companyName
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
		fetch("http://127.0.0.1:1313/companies/" + this.state.companyName)
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

	componentWillReceiveProps(nextProps) {
		this.setState({ companyName: nextProps.companyName});  
	}

	componentWillUpdate() {
		this.fetchArticle();
	}

	render() {
		const article = this.state.articles.map((item,index) => 
			<div>
				<h3 className="article-title">
					<a data-toggle="collapse" data-target={"#article-content-"+ item.title.split(" ").join("-") + index.toString()} aria-expanded="false" aria-controls={"article-content-" + item.title + index.toString()}>
						{item.title}<span class="material-icons">expand_more</span>
					</a>
				</h3>
				<div class="collapse" id={"article-content-" +item.title.split(" ").join("-") + index.toString()}>
					<p>{item.content}</p>
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

class Companies extends React.Component {
	constructor(props){
		super(props);
	};

	/*
	componentDidMount() {
		this.props.fetchAllCompanies();
	}

	componentDidUpdate() {
		this.props.fetchAllCompanies();
	}
	*/

	render() {
		const allCompanies = this.props.companyList.map((item) =>
			<div className="companyCard">
				<h6>{item.name}</h6>
				<div className="companyButtons">
					<button className="btn btn-success" value={item.name} onClick={this.props.updateCompany}>Make Current</button>
					<button className="btn btn-primary">Edit</button>
					<button className="btn btn-danger">Delete</button>
				</div>
			</div>
		)

		return(
			
			<div className="company-container">
				<h6>{this.props.companyName}</h6>
				<div id="card-container">
					{allCompanies}
				</div>
				<button id="newCompanyButton" className="btn btn-secondary btn-lg btn-block">Add new company</button>
			</div>
		)
	}
}

export default App;
