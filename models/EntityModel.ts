
class AllEntityModel {
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.appId = data.appId;
    this.metadata = data.metadata;
  }
  public id: number;
  public name: string;
  public appId: string;
  public metadata: string;
}

export { AllEntityModel };
