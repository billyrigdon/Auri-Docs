import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
import Navbar from "../Components/Navbar";
import Topbar from "../Components/Topbar";
import Applications from "./Applications";
import Articles from "./Articles";
import Backups from "./Backups";
import Companies from "./Companies";
import Email from "./Email";
import Networks from "./Networks";
import Servers from "./Servers";
import Shares from "./Shares";

/********************************************************************************
ATTENTION: This is trash. I was just learning react for the first time when
I wrote this and didn't separate this into multiple files like I should have
or use any kind of state management.This project isn't even worth looking at. 
Seriously. If you're going to browse my code, I recommend checking out one 
of my newer projects like Shulgin or RigdonOS. I'm sure I'll be embarassed 
of them too, but at least it's better than this.
**********************************************************************************/

//Parent Component
class Auri extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userEmail: localStorage.getItem("email"),
			userToken: localStorage.getItem("token"),
			nav: "companies",
			companyList: [],
			companyName: "",
			newCompany: "",
			newName: "",
			address: "",
			newAddress: "",
			emailAddr: "",
			newEmailAddr: "",
			phone: "",
			newPhone: "",
			articles: [],
			apps: [],
			selectedApp: {},
			updatedApp: {},
			updatedAppName: "",
			updatedAppInstaller: "",
			updatedAppNotes: "",
			backups: {
				offsiteTechnology: "",
				offsiteWindow: "",
				offsiteFrequency: "",
				offsiteDescription: "",
				offsiteLocation: "",
				localTechnology: "",
				localWindow: "",
				localFrequency: "",
				localDescription: "",
				localLocation: "",
			},
			newOffsiteTechnology: "",
			newOffsiteWindow: "",
			newOffsiteFrequency: "",
			newOffsiteDescription: "",
			newOffsiteLocation: "",
			newLocalTechnology: "",
			newLocalWindow: "",
			newLocalFrequency: "",
			newLocalDescription: "",
			newLocalLocation: "",
			email: {
				platform: "",
				webmail: "",
				emailServer: "",
				domains: "",
			},
			newEmailPlatform: "",
			newEmailWebmail: "",
			newEmailServer: "",
			newEmailDomains: "",
			shareServer: "",
			shareRootPath: "",
			shareOnPrem: false,
			shareDriveLetters: "",
			dns: "",
			ddns: "",
			subnet: "",
			public: "",
			gateway: "",
			domainController: "",
			dhcpServer: "",
			dhcpScope: "",
			routerSubnet: "",
			routerIpAddr: "",
			routerDhcp: false,
			routerPortForwards: "",
			routerNotes: "",
			routerVpn: "",
			wirelessSsid: "",
			wirelessEncryption: "",
			wirelessMgmtURL: "",
			vpnType: "",
			vpnPskLocation: "",
			vpnPublicIP: "",
			vpnClient: "",
			servers: [],
			selectedServer: {},
			updatedServer: {},
			updatedServerHostname: "",
			updatedServerRole: "",
			updatedServerIP: "",
			updatedServerNotes: "",
		};

		this.fetchCompany = this.fetchCompany.bind(this);
		this.selectCompany = this.selectCompany.bind(this);
		this.changeNav = this.changeNav.bind(this);
		this.fetchAllCompanies = this.fetchAllCompanies.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.deleteCompany = this.deleteCompany.bind(this);
		this.createCompany = this.createCompany.bind(this);
		this.handleNewCompanyChange = this.handleNewCompanyChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.selectApp = this.selectApp.bind(this);
		this.deleteApp = this.deleteApp.bind(this);
		this.handleAppNameChange = this.handleAppNameChange.bind(this);
		this.handleAppInstallerChange =
			this.handleAppInstallerChange.bind(this);
		this.handleAppNotesChange = this.handleAppNotesChange.bind(this);
		this.updateApp = this.updateApp.bind(this);
		this.createNewApp = this.createNewApp.bind(this);
		this.handleBackupOTChange = this.handleBackupOTChange.bind(this);
		this.handleBackupODChange = this.handleBackupODChange.bind(this);
		this.handleBackupOFChange = this.handleBackupOFChange.bind(this);
		this.handleBackupOLChange = this.handleBackupOLChange.bind(this);
		this.handleBackupOWChange = this.handleBackupOWChange.bind(this);
		this.handleBackupLDChange = this.handleBackupLDChange.bind(this);
		this.handleBackupLFChange = this.handleBackupLFChange.bind(this);
		this.handleBackupLLChange = this.handleBackupLLChange.bind(this);
		this.handleBackupLTChange = this.handleBackupLTChange.bind(this);
		this.handleBackupLWChange = this.handleBackupLWChange.bind(this);
		this.updateBackup = this.updateBackup.bind(this);
		this.updateCompanyInfo = this.updateCompanyInfo.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
		this.handleEmailPlatformChange =
			this.handleEmailPlatformChange.bind(this);
		this.handleEmailDomainsChange =
			this.handleEmailDomainsChange.bind(this);
		this.handleEmailServerChange = this.handleEmailServerChange.bind(this);
		this.handleEmailWebmailChange =
			this.handleEmailWebmailChange.bind(this);
		this.handleShareChange = this.handleShareChange.bind(this);
		this.updateShares = this.updateShares.bind(this);
		this.handleCheckChange = this.handleCheckChange.bind(this);
		this.updateNetworks = this.updateNetworks.bind(this);
		this.handleNetworksChange = this.handleNetworksChange.bind(this);
		this.handleRouterDhcpChange = this.handleRouterDhcpChange.bind(this);
		this.updateServer = this.updateServer.bind(this);
		this.deleteServer = this.deleteServer.bind(this);
		this.selectServer = this.selectServer.bind(this);
		this.handleServerChange = this.handleServerChange.bind(this);
		this.createNewServer = this.createNewServer.bind(this);
	}

	fetchCompany = async () => {
		if (this.state.companyName !== "") {
			const requestOptions = {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					company: this.state.companyName,
					email: this.state.userEmail,
					token: this.state.userToken,
				}),
			};

			fetch(
				"http://45.33.126.222:1944/api/companies/get/" +
					this.state.companyName,
				requestOptions
			)
				.then((res) => res.json())
				.then((res) =>
					this.setState({
						address: res.address,
						emailAddr: res.emailAddr,
						phone: res.phone,
						newAddress: res.address,
						newEmailAddr: res.emailAddr,
						newPhone: res.phone,
						newName: res.name,
						apps: res.apps,
						backups: res.backups,
						newOffsiteTechnology: res.backups.offsiteTechnology,
						newOffsiteWindow: res.backups.offsiteWindow,
						newOffsiteFrequency: res.backups.offsiteFrequency,
						newOffsiteDescription: res.backups.offsiteDescription,
						newOffsiteLocation: res.backups.offsiteLocation,
						newLocalTechnology: res.backups.localTechnology,
						newLocalWindow: res.backups.localWindow,
						newLocalFrequency: res.backups.localFrequency,
						newLocalDescription: res.backups.localDescription,
						newLocalLocation: res.backups.localLocation,
						email: {
							platform: res.email.platform,
							webmail: res.email.webmail,
							server: res.email.server,
							domains: res.email.domains,
						},
						newEmailWebmail: res.email.webmail,
						newEmailServer: res.email.server,
						newEmailPlatform: res.email.platform,
						newEmailDomains: res.email.domains,
						shareServer: res.fileShares.server,
						shareOnPrem: res.fileShares.onPrem,
						shareRootPath: res.fileShares.rootPath,
						shareDriveLetters: res.fileShares.driveLetters,
						dns: res.networks.dns,
						ddns: res.networks.ddns,
						subnet: res.networks.subnet,
						public: res.networks.public,
						gateway: res.networks.gateway,
						domainController: res.networks.domainController,
						dhcpServer: res.networks.dhcpServer,
						dhcpScope: res.networks.dhcpScope,
						routerSubnet: res.networks.router.subnet,
						routerIpAddr: res.networks.router.ipAddr,
						routerDhcp: res.networks.router.dhcp,
						routerPortForwards: res.networks.router.portForwards,
						routerNotes: res.networks.router.notes,
						routerVpn: res.networks.router.vpn,
						wirelessSsid: res.networks.wireless.ssid,
						wirelessEncryption: res.networks.wireless.encryption,
						wirelessMgmtURL: res.networks.wireless.mgmtURL,
						vpnType: res.networks.vpn.vpnType,
						vpnPskLocation: res.networks.vpn.pskLocation,
						vpnPublicIP: res.networks.vpn.publicIP,
						vpnClient: res.networks.vpn.vpnClient,
						servers: res.servers,
						updatedServerHostname: "",
						updatedServerIP: "",
						updatedServerRole: "",
						updatedServerNotes: "",
						selectedApp: "",
						updatedApp: "",
						updatedAppName: "",
						updatedAppInstaller: "",
						updatedAppNotes: "",
					})
				);
		} else {
			this.setState({
				newCompany: "",
				newName: "",
				address: "",
				newAddress: "",
				emailAddr: "",
				newEmailAddr: "",
				phone: "",
				newPhone: "",
				articles: [],
				apps: [],
				selectedApp: {},
				updatedAppName: "",
				updatedAppInstaller: "",
				updatedAppNotes: "",
				backups: {
					offsiteTechnology: "",
					offsiteWindow: "",
					offsiteFrequency: "",
					offsiteDescription: "",
					offsiteLocation: "",
					localTechnology: "",
					localWindow: "",
					localFrequency: "",
					localDescription: "",
					localLocation: "",
				},
				newOffsiteTechnology: "",
				newOffsiteWindow: "",
				newOffsiteFrequency: "",
				newOffsiteDescription: "",
				newOffsiteLocation: "",
				newLocalTechnology: "",
				newLocalWindow: "",
				newLocalFrequency: "",
				newLocalDescription: "",
				newLocalLocation: "",
				email: {
					platform: "",
					webmail: "",
					emailServer: "",
					domains: "",
				},
				newEmailPlatform: "",
				newEmailWebmail: "",
				newEmailServer: "",
				newEmailDomains: "",
				shareServer: "",
				shareRootPath: "",
				shareOnPrem: false,
				shareDriveLetters: "",
				dns: "",
				ddns: "",
				subnet: "",
				public: "",
				gateway: "",
				domainController: "",
				dhcpServer: "",
				dhcpScope: "",
				routerSubnet: "",
				routerIpAddr: "",
				routerDhcp: false,
				routerPortForwards: "",
				routerNotes: "",
				routerVpn: "",
				wirelessSsid: "",
				wirelessEncryption: "",
				wirelessMgmtURL: "",
				vpnType: "",
				vpnPskLocation: "",
				vpnPublicIP: "",
				vpnClient: "",
				servers: [],
				selectedServer: {},
				updatedServerHostname: "",
				updatedServerRole: "",
				updatedServerIP: "",
				updatedServerNotes: "",
			});
		}
	};

	fetchAllCompanies() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
				email: this.state.userEmail,
				token: this.state.userToken,
			}),
		};

		fetch("http://45.33.126.222:1944/api/companies/get", requestOptions)
			.then((res) => res.json())
			.then((res) =>
				this.setState({
					companyList: res,
				})
			);
	}

	//changes the selected company
	selectCompany(e) {
		this.setState({
			companyName: e.target.value,
		});
	}
	//changes the content view based on the selected nav state
	changeNav(navValue) {
		if (this.state.companyName) {
			this.setState({
				nav: navValue,
			});
		}
	}

	//Functions for Company Page
	createCompany(event) {
		if (event.target.value !== "") {
			event.preventDefault();

			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ company: this.state.newCompany }),
			};

			fetch(
				"http://45.33.126.222:1944/api/companies/create",
				requestOptions
			)
				.then((res) => res.json())
				.then(
					this.setState({
						companyName: this.state.newCompany,
						newCompany: "",
					})
				);
		}
	}

	deleteCompany(event) {
		event.preventDefault();

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ company: event.target.value }),
		};

		fetch(
			"http://45.33.126.222:1944/api/companies/delete/" +
				event.target.value +
				"/delete",
			requestOptions
		)
			.then((res) => res.json())
			.then(
				this.setState({
					companyName: "",
				})
			);
	}

	updateCompanyInfo(event) {
		if (this.state.companyName) {
			event.preventDefault();

			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					company: this.state.companyName,
					newName: this.state.newName,
					address: this.state.newAddress,
					phone: this.state.newPhone,
					emailAddr: this.state.newEmailAddr,
				}),
			};

			fetch(
				"http://45.33.126.222:1944/api/companies/update/" +
					this.state.companyName +
					"/info",
				requestOptions
			)
				.then((res) => res.json())
				.then(
					this.setState({
						address: this.state.newAddress,
						newAddress: "",
						phone: this.state.newPhone,
						newPhone: "",
						emailAddr: this.state.newEmailAddr,
						newEmailAddr: "",
						companyName: this.state.newName,
						newName: "",
					})
				)
				.then(
					setTimeout(() => {
						this.fetchCompany();
					}, 500)
				);
		}
	}

	handleNewCompanyChange(event) {
		this.setState({
			newCompany: event.target.value,
		});
	}

	handleNameChange(event) {
		this.setState({
			newName: event.target.value,
		});
	}

	handleAddressChange(event) {
		this.setState({
			newAddress: event.target.value,
		});
	}

	handleEmailChange(event) {
		this.setState({
			newEmailAddr: event.target.value,
		});
	}

	handlePhoneChange(event) {
		this.setState({
			newPhone: event.target.value,
		});
	}

	//Functions used by App page

	selectApp(appObj) {
		this.setState({
			selectedApp: appObj,
			updatedApp: appObj,
			updatedAppName: appObj.name,
			updatedAppInstaller: appObj.installer,
			updatedAppNotes: appObj.notes,
		});
	}

	deleteApp(event) {
		event.preventDefault();

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				company: this.state.companyName,
				app: this.state.selectedApp,
			}),
		};

		fetch(
			"http://45.33.126.222:1944/api/companies/apps/" +
				this.state.companyName +
				"/delete",
			requestOptions
		)
			.then((res) => res.json())
			.then(
				this.setState({
					selectedApp: "",
					updatedApp: "",
					updatedAppName: "",
					updatedAppInstaller: "",
					updatedAppNotes: "",
				})
			)
			.then(
				setTimeout(() => {
					this.fetchCompany();
				}, 500)
			);
	}

	updateApp(event) {
		event.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				company: this.state.companyName,
				app: this.state.selectedApp,
				updatedApp: {
					name: this.state.updatedAppName,
					installer: this.state.updatedAppInstaller,
					notes: this.state.updatedAppNotes,
				},
			}),
		};

		fetch(
			"http://45.33.126.222:1944/api/companies/apps/" +
				this.state.companyName +
				"/update",
			requestOptions
		)
			.then((res) => res.json())
			.then(
				this.setState({
					selectedApp: "",
					updatedAppName: "",
					updatedAppInstaller: "",
					updatedAppNotes: "",
				})
			)
			.then(
				setTimeout(() => {
					this.fetchCompany();
				}, 500)
			);
	}

	handleAppNameChange(event) {
		this.setState({
			updatedAppName: event.target.value,
		});
	}

	handleAppInstallerChange(event) {
		this.setState({
			updatedAppInstaller: event.target.value,
		});
	}

	handleAppNotesChange(event) {
		this.setState({
			updatedAppNotes: event.target.value,
		});
	}

	createNewApp(event) {
		event.preventDefault();
		this.setState({
			selectedApp: "",
			updatedAppName: "",
			updatedAppInstaller: "",
			updatedAppNotes: "",
		});
	}

	//Functions used by Backup page

	updateBackup(event) {
		event.preventDefault();

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				company: this.state.companyName,
				backups: {
					offsiteTechnology: this.state.newOffsiteTechnology,
					offsiteWindow: this.state.newOffsiteWindow,
					offsiteDescription: this.state.newOffsiteDescription,
					offsiteLocation: this.state.newOffsiteLocation,
					offsiteFrequency: this.state.newOffsiteFrequency,
					localTechnology: this.state.newLocalTechnology,
					localWindow: this.state.newLocalWindow,
					localDescription: this.state.newLocalDescription,
					localLocation: this.state.newLocalLocation,
					localFrequency: this.state.newLocalDescription,
				},
			}),
		};

		fetch(
			"http://45.33.126.222:1944/api/companies/backups/" +
				this.state.companyName +
				"/update",
			requestOptions
		)
			.then((res) => res.json())
			.then(
				this.setState({
					newOffsiteTechnology: "",
					newOffsiteWindow: "",
					newOffsiteFrequency: "",
					newOffsiteDescription: "",
					newOffsiteLocation: "",
					newLocalTechnology: "",
					newLocalWindow: "",
					newLocalFrequency: "",
					newLocalDescription: "",
					newLocalLocation: "",
				})
			)
			.then(
				setTimeout(() => {
					this.fetchCompany();
				}, 500)
			);
	}

	handleBackupOTChange(event) {
		this.setState({
			newOffsiteTechnology: event.target.value,
		});
	}

	handleBackupOWChange(event) {
		this.setState({
			newOffsiteWindow: event.target.value,
		});
	}

	handleBackupOFChange(event) {
		this.setState({
			newOffsiteFrequency: event.target.value,
		});
	}

	handleBackupODChange(event) {
		this.setState({
			newOffsiteDescription: event.target.value,
		});
	}

	handleBackupOLChange(event) {
		this.setState({
			newOffsiteLocation: event.target.value,
		});
	}

	handleBackupLTChange(event) {
		this.setState({
			newLocalTechnology: event.target.value,
		});
	}

	handleBackupLWChange(event) {
		this.setState({
			newLocalWindow: event.target.value,
		});
	}

	handleBackupLFChange(event) {
		this.setState({
			newLocalFrequency: event.target.value,
		});
	}

	handleBackupLDChange(event) {
		this.setState({
			newLocalDescription: event.target.value,
		});
	}

	handleBackupLLChange(event) {
		this.setState({
			newLocalLocation: event.target.value,
		});
	}

	//Functions used by email page

	updateEmail(event) {
		event.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				company: this.state.companyName,
				email: {
					webmail: this.state.newEmailWebmail,
					platform: this.state.newEmailPlatform,
					domains: this.state.newEmailDomains,
					server: this.state.newEmailServer,
				},
			}),
		};

		fetch(
			"http://45.33.126.222:1944/api/companies/email/" +
				this.state.companyName,
			requestOptions
		)
			.then((res) => res.json())
			.then(
				setTimeout(() => {
					this.fetchCompany();
				}, 500)
			);
	}

	handleEmailPlatformChange(event) {
		this.setState({
			newEmailPlatform: event.target.value,
		});
	}

	handleEmailWebmailChange(event) {
		this.setState({
			newEmailWebmail: event.target.value,
		});
	}

	handleEmailServerChange(event) {
		this.setState({
			newEmailServer: event.target.value,
		});
	}

	handleEmailDomainsChange(event) {
		this.setState({
			newEmailDomains: event.target.value,
		});
	}

	//Functions for Shares component
	updateShares(event) {
		event.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				company: this.state.companyName,
				fileShares: {
					server: this.state.shareServer,
					driveLetters: this.state.shareDriveLetters,
					onPrem: this.state.shareOnPrem,
					rootPath: this.state.shareRootPath,
				},
			}),
		};

		fetch(
			"http://45.33.126.222:1944/api/companies/shares/" +
				this.state.companyName,
			requestOptions
		)
			.then((res) => res.json())
			.then(
				setTimeout(() => {
					this.fetchCompany();
				}, 500)
			);
	}

	handleShareChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleCheckChange(event) {
		this.setState({
			shareOnPrem: !this.state.shareOnPrem,
		});
	}

	//Networks page functions

	updateNetworks(event) {
		event.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				company: this.state.companyName,
				networks: {
					dns: this.state.dns,
					ddns: this.state.ddns,
					subnet: this.state.subnet,
					public: this.state.public,
					gateway: this.state.gateway,
					domainController: this.state.domainController,
					dhcpServer: this.state.dhcpServer,
					dhcpScope: this.state.dhcpScope,
					router: {
						subnet: this.state.routerSubnet,
						ipAddr: this.state.routerIpAddr,
						dhcp: this.state.routerDhcp,
						portForwards: this.state.routerPortForwards,
						notes: this.state.routerNotes,
						vpn: this.state.routerVpn,
					},
					wireless: {
						ssid: this.state.wirelessSsid,
						encryption: this.state.wirelessEncryption,
						mgmtURL: this.state.wirelessMgmtURL,
					},
					vpn: {
						vpnType: this.state.vpnType,
						pskLocation: this.state.vpnPskLocation,
						publicIP: this.state.vpnPublicIP,
						vpnClient: this.state.vpnClient,
					},
				},
			}),
		};

		fetch(
			"http://45.33.126.222:1944/api/companies/networks/" +
				this.state.companyName,
			requestOptions
		)
			.then((res) => res.json())
			.then(
				setTimeout(() => {
					this.fetchCompany();
				}, 500)
			);
	}

	handleNetworksChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleRouterDhcpChange(event) {
		this.setState({
			routerDhcp: !this.state.routerDhcp,
		});
	}

	//Functions used by server page
	selectServer(serverObj) {
		this.setState({
			selectedServer: serverObj,
			updatedServer: serverObj,
			updatedServerHostname: serverObj.hostname,
			updatedServerIP: serverObj.ip,
			updatedServerRole: serverObj.role,
			updatedServerNotes: serverObj.notes,
		});
	}

	deleteServer(event) {
		event.preventDefault();

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				company: this.state.companyName,
				server: this.state.selectedServer,
			}),
		};

		fetch(
			"http://45.33.126.222:1944/api/companies/servers/" +
				this.state.companyName +
				"/delete",
			requestOptions
		)
			.then((res) => res.json())
			.then(
				this.setState({
					selectedServer: {},
					updatedServer: {},
					updatedServerHostname: "",
					updatedServerIP: "",
					updatedServerRole: "",
					updatedServerNotes: "",
				})
			)
			.then(
				setTimeout(() => {
					this.fetchCompany();
				}, 500)
			);
	}

	updateServer(event) {
		event.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				company: this.state.companyName,
				server: this.state.selectedServer,
				updatedServer: {
					hostname: this.state.updatedServerHostname,
					role: this.state.updatedServerRole,
					ip: this.state.updatedServerIP,
					notes: this.state.updatedServerNotes,
				},
			}),
		};

		fetch(
			"http://45.33.126.222:1944/api/companies/servers/" +
				this.state.companyName +
				"/update",
			requestOptions
		)
			.then((res) => res.json())
			.then(
				this.setState({
					selectedServer: {},
					updatedServerHostname: "",
					updatedServerIP: "",
					updatedServerRole: "",
					updatedServerNotes: "",
				})
			)
			.then(
				setTimeout(() => {
					this.fetchCompany();
				}, 500)
			);
	}

	handleServerChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	createNewServer(event) {
		event.preventDefault();
		this.setState({
			selectedServer: {},
			updatedServerHostname: "",
			updatedServerIP: "",
			updatedServerRole: "",
		});
	}

	//React Hooks
	componentDidMount() {
		this.fetchAllCompanies();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.companyName !== this.state.companyName) {
			setTimeout(() => {
				this.fetchCompany();
				this.fetchAllCompanies();
			}, 500);
		}
	}

	render() {
		if (this.state.nav === "companies" || this.state.companyName === "") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar
						companyList={this.state.companyList}
						fetchAllCompanies={this.fetchAllCompanies}
						selectCompany={this.selectCompany}
						companyName={this.state.companyName}
					/>
					<h1>{this.state.counter}</h1>
					<div id="content-container">
						<Companies
							updateCompanyInfo={this.updateCompanyInfo}
							handlePhoneChange={this.handlePhoneChange}
							updateCompanyPhone={this.updateCompanyPhone}
							newEmailAddr={this.state.newEmailAddr}
							emailAddr={this.state.emailAddr}
							newPhone={this.state.newPhone}
							phone={this.state.phone}
							handleEmailChange={this.handleEmailChange}
							updateCompanyEmail={this.updateCompanyEmail}
							handleAddressChange={this.handleAddressChange}
							updateCompanyAddress={this.updateCompanyAddress}
							address={this.state.address}
							newAddress={this.state.newAddress}
							newCompany={this.state.newCompany}
							handleNewCompanyChange={this.handleNewCompanyChange}
							createCompany={this.createCompany}
							deleteCompany={this.deleteCompany}
							handleNameChange={this.handleNameChange}
							newName={this.state.newName}
							updateCompanyName={this.updateCompanyName}
							companyList={this.state.companyList}
							fetchAllCompanies={this.fetchAllCompanies}
							selectCompany={this.selectCompany}
							companyName={this.state.companyName}
						/>
					</div>
				</div>
			);
		} else if (this.state.nav === "articles") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar
						companyList={this.state.companyList}
						fetchAllCompanies={this.fetchAllCompanies}
						selectCompany={this.selectCompany}
						companyName={this.state.companyName}
					/>
					<div id="content-container">
						<Articles
							userEmail={this.state.userEmail}
							userToken={this.state.userToken}
							setState={this.setState}
							fetchCompany={this.fetchCompany}
							companyName={this.state.companyName}
							articles={this.state.articles}
						/>
					</div>
				</div>
			);
		} else if (this.state.nav === "applications") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar
						companyList={this.state.companyList}
						fetchAllCompanies={this.fetchAllCompanies}
						selectCompany={this.selectCompany}
						companyName={this.state.companyName}
					/>
					<div id="content-container">
						<Applications
							createNewApp={this.createNewApp}
							handleAppNotesChange={this.handleAppNotesChange}
							updatedAppNotes={this.state.updatedAppNotes}
							updatedAppInstaller={this.state.updatedAppInstaller}
							updatedAppName={this.state.updatedAppName}
							handleAppInstallerChange={
								this.handleAppInstallerChange
							}
							updateApp={this.updateApp}
							handleAppNameChange={this.handleAppNameChange}
							deleteApp={this.deleteApp}
							selectedApp={this.state.selectedApp}
							selectApp={this.selectApp}
							apps={this.state.apps}
							companyName={this.state.companyName}
						/>
					</div>
				</div>
			);
		} else if (this.state.nav === "backups") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar
						companyList={this.state.companyList}
						fetchAllCompanies={this.fetchAllCompanies}
						selectCompany={this.selectCompany}
						companyName={this.state.companyName}
					/>
					<div id="content-container">
						<Backups
							{...this.state}
							updateBackup={this.updateBackup}
							handleBackupOWChange={this.handleBackupOWChange}
							handleBackupOLChange={this.handleBackupOLChange}
							handleBackupOFChange={this.handleBackupOFChange}
							handleBackupODChange={this.handleBackupODChange}
							handleBackupOTChange={this.handleBackupOTChange}
							handleBackupLWChange={this.handleBackupLWChange}
							handleBackupLTChange={this.handleBackupLTChange}
							handleBackupLLChange={this.handleBackupLLChange}
							handleBackupLFChange={this.handleBackupLFChange}
							handleBackupLDChange={this.handleBackupLDChange}
						/>
					</div>
				</div>
			);
		} else if (this.state.nav === "email") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar
						companyList={this.state.companyList}
						fetchAllCompanies={this.fetchAllCompanies}
						selectCompany={this.selectCompany}
						companyName={this.state.companyName}
					/>
					<div id="content-container">
						<Email
							{...this.state}
							updateEmail={this.updateEmail}
							handleEmailWebmailChange={
								this.handleEmailWebmailChange
							}
							handleEmailServerChange={
								this.handleEmailServerChange
							}
							handleEmailPlatformChange={
								this.handleEmailPlatformChange
							}
							handleEmailDomainsChange={
								this.handleEmailDomainsChange
							}
						/>
					</div>
				</div>
			);
		} else if (this.state.nav === "shares") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar
						companyList={this.state.companyList}
						fetchAllCompanies={this.fetchAllCompanies}
						selectCompany={this.selectCompany}
						companyName={this.state.companyName}
					/>
					<div id="content-container">
						<Shares
							{...this.state}
							handleCheckChange={this.handleCheckChange}
							updateShares={this.updateShares}
							handleShareChange={this.handleShareChange}
						/>
					</div>
				</div>
			);
		} else if (this.state.nav === "networks") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar
						companyList={this.state.companyList}
						fetchAllCompanies={this.fetchAllCompanies}
						selectCompany={this.selectCompany}
						companyName={this.state.companyName}
					/>
					<div id="content-container">
						<Networks
							handleRouterDhcpChange={this.handleRouterDhcpChange}
							handleNetworksChange={this.handleNetworksChange}
							updateNetworks={this.updateNetworks}
							{...this.state}
						/>
					</div>
				</div>
			);
		} else if (this.state.nav === "servers") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar
						companyList={this.state.companyList}
						fetchAllCompanies={this.fetchAllCompanies}
						selectCompany={this.selectCompany}
						companyName={this.state.companyName}
					/>
					<div id="content-container">
						<Servers
							selectServer={this.selectServer}
							createNewServer={this.createNewServer}
							deleteServer={this.deleteServer}
							handleServerChange={this.handleServerChange}
							updateServer={this.updateServer}
							{...this.state}
						/>
					</div>
				</div>
			);
		}
	}
}

export default Auri;
