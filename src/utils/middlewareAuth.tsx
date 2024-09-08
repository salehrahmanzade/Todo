import {OptionHttpObject} from "@/types/http";


function fetchApi(url: string, options: any) {
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<any>
        }).then((res) => res.data);
}

export default async function middlewareAuth(req:any) {
    try {

        const options: OptionHttpObject = {
            method: "GET",
            credentials: "include",
            headers: {
                Cookie:
                    `${req.cookies.get("accessToken")?.name}=${
                        req.cookies.get("accessToken")?.value
                    }; ${req.cookies.get("refreshToken")?.name}=${
                        req.cookies.get("refreshToken")?.value
                    }` || "-",
            },
        };

        const data: any = await fetchApi(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, options);
        const {user} = data || {};

        return user;
    } catch (e) {
      console.log(e)
    }
}
