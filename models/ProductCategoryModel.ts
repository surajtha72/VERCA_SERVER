class AllProductCategoryModel {
    constructor(data: any) {
      this.id = data.id;
      this.categoryName = data.categoryName;
      this.shortDescription = data.shortDescription;
      this.isActive = data.isActive;
    }
    public id: number;
    public categoryName: string;
    public shortDescription: string;
    public isActive: boolean;
  }
  
  class CreateProductCategoryModel {
    constructor(data: any) {
        this.categoryName = data.categoryName;
        this.shortDescription = data.shortDescription;
        this.isActive = data.isActive;
      }
      public categoryName: string;
      public shortDescription: string;
      public isActive: boolean;
  }
  
  class UpdateProductCategoryModel {
    constructor(data: any) {
        this.id = data.id;
        this.categoryName = data.categoryName;
        this.shortDescription = data.shortDescription;
        this.isActive = data.isActive;
      }
      public id: number;
      public categoryName: string;
      public shortDescription: string;
      public isActive: boolean;
  }
  
  class DeleteProductCategoryModel {
    constructor(data: any) {
      this.id = data.id;
    }
    public id: number;
  }
  
  export { AllProductCategoryModel, CreateProductCategoryModel, UpdateProductCategoryModel, DeleteProductCategoryModel };
  