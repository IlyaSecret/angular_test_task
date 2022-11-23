export interface Item {
    id: number,
    bs_company_statement: string,
    business_name: string,
    buzzword: string,
    catch_phrase: string,
    duns_number: string,
    employee_identification_number: string,
    full_address: string,
    industry: string,
    latitude: number,
    logo: string,
    longitude: number,
    phone_number: string,
    suffix: string,
    type: string,
    uid: string
}

export interface addModelArgs {
    page: number,
    pagesize: number
}
