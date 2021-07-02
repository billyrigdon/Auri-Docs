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
			companyName: "",
			newName: "",
			newCompany: "",
			oldName: "",
			counter: 0,
			address: "",
			newAddress: "",
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
		this.updateCompanyName = this.updateCompanyName.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.deleteCompany = this.deleteCompany.bind(this);
		this.createCompany = this.createCompany.bind(this);
		this.handleNewCompanyChange = this.handleNewCompanyChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.updateCompanyAddress = this.updateCompanyAddress.bind(this);
		
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

	//changes the selected company
	updateCompany(e) {
		this.setState({
			companyName: e.target.value
		});
	};
	//changes the content view based on the selected nav state
	changeNav(navValue) {
		this.setState({
			nav: navValue
		});
	};

	createCompany(event) {
		if (event.target.value !== "") {
			event.preventDefault();

			const requestOptions = {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({company: this.state.newCompany})
			};

			fetch("http://127.0.0.1:1313/companies/create", requestOptions)
				.then(res => res.json())
				.then(this.setState({
					companyName: this.state.newCompany,
					newCompany: ""
				}));
		}
	}

	updateCompanyName(event) {
		if (this.state.companyName) {
			if (event.target.value !== "") {
				event.preventDefault();

				const requestOptions = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({company: this.state.companyName, newName: this.state.newName})
				};
		
				fetch("http://127.0.0.1:1313/companies/" + this.state.companyName + "/name", requestOptions)
					.then(res => res.json())
					.then(this.setState({
						companyName: this.state.newName,
						newName: ""
					}));
			}
		}	
	};

//Next two functions are for updating the company address 
	updateCompanyAddress(event) {
		if (this.state.companyName) {
			if (event.target.value !== "") {
				event.preventDefault();

				const requestOptions = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({company: this.state.companyName, address: this.state.newAddress})
				};
		
				fetch("http://127.0.0.1:1313/companies/" + this.state.companyName + "/address", requestOptions)
					.then(res => res.json())
					.then(this.setState({
						address: this.state.newAddress,
						newAddress: ""
					}));
			}
		}
	};

	handleAddressChange(event) {
		this.setState({
			newAddress: event.target.value
		});
	};

	handleNewCompanyChange(event) {
		this.setState({
			newCompany: event.target.value
		});
	};

	handleNameChange(event) {
		this.setState({
			newName: event.target.value
		});
	};

	deleteCompany(event) {
		event.preventDefault();

		const requestOptions = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({company: event.target.value})
		};
		
		fetch("http://127.0.0.1:1313/companies/" + event.target.value + "/delete", requestOptions)
			.then(res => res.json())
			.then(this.setState({
				companyName: ""
			}))
	}

	componentDidMount() {
		this.fetchCompany();
		this.fetchAllCompanies();	
	};


	componentDidUpdate(prevProps,prevState) {
		if (prevState.companyName !== this.state.companyName) {
			setTimeout(()=> {
				this.fetchCompany();
				this.fetchAllCompanies();
			},1200)
		} 
	};



	render() {

		if (this.state.nav === "companies" || this.state.companyName === "") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar  companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} updateCompany={this.updateCompany} companyName={this.state.companyName}/>
					<h1>{this.state.counter}</h1>
					<div id="content-container">
						<Companies handleAddressChange={this.handleAddressChange} updateCompanyAddress={this.updateCompanyAddress} address={this.state.address} newAddress={this.state.newAddress} newCompany={this.state.newCompany} handleNewCompanyChange={this.handleNewCompanyChange} createCompany={this.createCompany} deleteCompany={this.deleteCompany} handleNameChange={this.handleNameChange} newName={this.state.newName} updateCompanyName={this.updateCompanyName} companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} updateCompany={this.updateCompany} companyName={this.state.companyName} />
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
			<div className="article-cards">
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
		this.state = {
			companyName: this.props.companyName
		}
	};

	render() {
		const allCompanies = this.props.companyList.map((item) =>
			<div className="companyCard">
				<h6>{item.name}</h6>
				<button className="btn btn-success" value={item.name} onClick={this.props.updateCompany}>Select</button>				
			</div>
		)

		return(
			
			<div key={this.props.companyName} id="company-container">
				
				<div id="company-info-container">
					<form className="companyEditFields" onSubmit={this.props.createCompany}>
						<button type="submit" className="btn btn-primary">Create</button>
						<input onChange={this.props.handleNewCompanyChange} value={this.props.newCompany} type="text" />	
					</form>
					<div id="current-company-card">
						<h6>Current Company</h6>
						<h4>{this.props.companyName}</h4>
					</div>
					<form className="companyEditFields" onSubmit={this.props.updateCompanyName}>
						<button type="submit" className="btn btn-primary">Update</button>
						<input onChange={this.props.handleNameChange} value={this.props.newName} placeholder={"Name: " + this.props.companyName} type="text" />
					</form>
					<form className="companyEditFields" onSubmit={this.props.updateCompanyAddress}>
						<button type="submit" className="btn btn-primary">Update</button>
						<input onChange={this.props.handleAddressChange} value={this.props.newAddress} placeholder={"Address: " + this.props.address} type="text" />
						
					</form>
					<form className="companyEditFields" onSubmit="">
						<button type="submit" className="btn btn-primary">Update</button>
						<input onChange={this.props.handleNameChange} value={this.props.newName} placeholder={this.props.companyName} type="text" />
					</form>
					<form className="companyEditFields" onSubmit="">
						<button type="submit" className="btn btn-primary">Update</button>
						<input onChange={this.props.handleNameChange} value={this.props.newName} placeholder={this.props.companyName} type="text" />	
					</form>
					<button id="company-delete" className="btn btn-danger" value={this.props.companyName} onClick={this.props.deleteCompany}>Delete</button>
				</div>

				<div id="card-container">
					{allCompanies}
				</div>
				
			</div>
		)
	}
}

export default App;
