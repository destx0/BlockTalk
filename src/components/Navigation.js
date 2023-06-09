import { ethers } from "ethers";
import person2 from "../assets/person2.png";

const Navigation = ({ account, setAccount }) => {
	const connectHandler = async () => {
		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		const account = ethers.utils.getAddress(accounts[0]);
		setAccount(account);
	};

	return (
		<nav>
			<div className="nav__brand">
				<img className="nav__image" src={person2} alt="Person" />
				<h1>BlockTalk</h1>
			</div>

			{account ? (
				<button type="button" className="nav__connect">
					{account.slice(0, 6) + "..." + account.slice(38, 42)}
				</button>
			) : (
				<button type="button" className="nav__connect" onClick={connectHandler}>
					Connect
				</button>
			)}
		</nav>
	);
};

export default Navigation;
