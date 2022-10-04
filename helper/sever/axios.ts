import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";



const rootApi = process.env.NEXT_PUBLIC_BASE;
export const config = (token: string | null) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            "branch-id": 1,
            "company-id": 1,
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${token}`
        },
    };
    return config;
};
export const baseGetApi = async <T>(path: string, token: string|null, params?:string) => {
    let joinPath: string = path;
    try {
        const response = await axios.get(
            `${rootApi}${joinPath}${params}`,
            config(token),
        );
        return response.data;
    } catch (error) {
        return error;
    }
};
// export const basePostApi = async <T>({
//     paths,
//     data,
//     headers,
// }: any) => {
//     let joinPath: string = "";
//     paths.map((path) => {
//         joinPath += `/${path}`;
//     });
//     try {
//         const response = await axios.get(
//             `${rootApi}${joinPath}`,
//             headers
//                 ? {
//                     headers: headers,
//                     data: data,
//                 }
//                 : {
//                     ...config(),
//                     data: data,
//                 }
//         );
//         return response;
//     } catch (error) {
//         return error;
//     }
// };
// export const baseUpdateApi = async <T>({
//     paths,
//     data,
//     headers,
// }: any) => {
//     let joinPath: string = "";
//     paths.map((path) => {
//         joinPath += `/${path}`;
//     });
//     try {
//         const response = await axios.get(
//             `${rootApi}${joinPath}`,
//             headers
//                 ? {
//                     headers: headers,
//                     data: data,
//                 }
//                 : {
//                     ...config(),
//                     data: data,
//                 }
//         );
//         return response;
//     } catch (error) {
//         return error;
//     }
// };
// export const baseDeleteApi = async <T>({
//     paths,
//     headers,
// }: any) => {
//     let joinPath: string = "";
//     paths.map((path) => {
//         joinPath += `/${path}`;
//     });
//     try {
//         const response = await axios.get(
//             `${rootApi}${joinPath}`,
//             headers
//                 ? {
//                     ...config(),
//                     headers,
//                 }
//                 : config()
//         );
//         return response;
//     } catch (error) {
//         return error;
//     }
// }