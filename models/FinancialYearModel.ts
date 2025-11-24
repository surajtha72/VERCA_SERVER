class AllFinancialYearModel {
    constructor(data: any) {
        this.id = data.id;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        
    }
    public id: number;
    public startDate: Date;
    public endDate: Date;
}

class CreateFinancialYearModel {
    constructor(data: any) {
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }
    public startDate: Date;
    public endDate: Date;
}

class UpdateFinancialYearModel {
    constructor(data: any) {
        this.id = data.id;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }
    public id: number;
    public startDate: Date;
    public endDate: Date;
}

class DeleteFinancialYearModel {
    constructor(data: any) {
        this.id = data.id;
    }
    public id: number;
}

export {
    AllFinancialYearModel,
    CreateFinancialYearModel,
    UpdateFinancialYearModel,
    DeleteFinancialYearModel
}
