import { EntityList } from "../entities/EntityList";

class AllPermissionsModel {
    constructor(data: any) {
      this.id = data.id;
      this.shortName = data.shortName;
      this.description = data.description;
      this.action = data.action;
      this.entityId = data.entityId;
    }
    public id: number;
    public shortName: string;
    public description: string;
    public action: string;
    public entityId: EntityList;
  }
  
  export { AllPermissionsModel };
  