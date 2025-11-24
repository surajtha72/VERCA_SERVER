class AllStatesModel {
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.stateCode = data.stateCode;
  }
  public id: number;
  public name: string;
  public stateCode: string;
}

class CreateStateModel {
  constructor(data: any) {
    this.name = data.name;
    this.stateCode = data.stateCode;
  }
  public name: string;
  public stateCode: string;
}

class UpdateStateModel {
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.stateCode = data.stateCode;
  }
  public id: number;
  public name: string;
  public stateCode: string;
}

class DeleteStateModel {
  constructor(data: any) {
    this.id = data.id;
  }
  public id: number;
}

export { AllStatesModel, UpdateStateModel, CreateStateModel, DeleteStateModel };
