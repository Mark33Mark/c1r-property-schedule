import {
	Afs,
	Bradford,
	Cemintel,
	CsrIcon,
	Gyprock,
	Hebel,
	Himmel,
	Martini,
	Monier,
	PghBricks,
	Potter,
	WovenImage,
} from "../assets/icons";

export const matchLogo = (business) => {
	switch (business) {
		case "AFS":
		case "AFS ":
			return <Afs className="csr-logo" width={48} height={22} />;
		case "BRADFORD":
		case "BRADFORD ":
			return <Bradford className="csr-logo" width={96} />;
		case "CEMINTEL":
		case "CEMINTEL ":
			return <Cemintel className="csr-logo" width={96} />;
		case "CORPORATE":
		case "CORPORATE ":
			return <CsrIcon className="csr-logo corporate" />;
		case "GYPROCK":
		case "GYPROCK ":
			return <Gyprock className="csr-logo" width={118} />;
		case "HEBEL":
		case "HEBEL ":
			return <Hebel className="csr-logo hebel" width={118} />;
		case "HIMMEL":
		case "HIMMEL ":
			return <Himmel />;
		case "MARTINI":
		case "MARTINI ":
			return <Martini />;
		case "MONIER":
		case "MONIER ":
			return <Monier className="csr-logo" width={118} />;
		case "PGH":
		case "PGH ":
		case "PGH BRICKS":
			return <PghBricks />;
		case "POTTERS":
		case "POTTERS ":
			return <Potter />;
		case "WOVEN IMAGE":
		case "WOVEN IMAGE ":
			return (
				<WovenImage className="csr-logo woven" width={96} height={64} />
			);
		default:
			return <CsrIcon />;
	}
};
