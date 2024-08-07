export type TAddress = {
    city: string,
    lines: string[],
    country: string
};

export type TProject = {
    phone: string;
    email: string;
    address: TAddress;
    draft: boolean;
}

export type TTeamMemberAccessControl = {
    schedule: boolean;
    communicateWithClient: boolean;
    requests: boolean;
    assignments: boolean;
    expenses: boolean;
    clients: boolean;
    projects: boolean;
    jobs: boolean;
    invoices: boolean;
    reports: boolean;
}

export type TProduct = {
    productNumber: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export type TUser = {
    client: 'client';
    contractor: 'contractor';
    team: 'team';
    teamMember: 'teammember';
}

export type TCompany = {
    name: string;
}




