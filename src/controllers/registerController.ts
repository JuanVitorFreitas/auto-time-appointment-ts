import { Request, Response } from "express";
import { CookieJar } from 'tough-cookie';
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";


async function register(req: Request, res: Response) {
	const jar = new CookieJar();
	const baseURL = 'https://cvccorp.nexusweb.com.br';

	const {
		login,
		password,
		type // Default Type 2 = Login with CPF
	} = req.body;

	const captchaUrl = '/captcha.asp';

	const api = wrapper(axios.create({
		baseURL: 'https://cvccorp.nexusweb.com.br',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		withCredentials: true,
		jar
	}));

	try {
		await api.get('/captcha.asp');
		const cookies = jar.getCookiesSync(baseURL + captchaUrl);
		const captcha = cookies.find((c) => c.key === 'ASPCAPTCHA')?.value;

		const payload = {
			acao: '1',
			txtValor: login,
			txtSenha: password,
			cboCampo: type,
			chkAdicPer: '1',
			chkAdicIns: '1',
			chkAdicEmb: '1',
			captchacode: captcha,
			cboLocal: '6055',
		}

		const { data, ...rest } = await api.post('/default.asp', payload);
		res.status(rest.status).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
}

export default register;