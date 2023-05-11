class Config {
    private baseUrl: string;
    private defaultUserType: string;
    private enableUserTypeSelection: boolean;
  
    constructor() {
      this.baseUrl = process.env.REACT_APP_BASE_URL || '';
      this.defaultUserType = process.env.REACT_APP_DEFAULT_USER_TYPE || 'customer';
      this.enableUserTypeSelection = process.env.REACT_APP_ENABLE_USER_TYPE_SELECTION === 'true';
    }
  
    getBaseUrl(): string {
      return this.baseUrl;
    }
  
    getDefaultUserType(): string {
      return this.defaultUserType;
    }
  
    isUserTypeSelectionEnabled(): boolean {
      return this.enableUserTypeSelection;
    }
  }
  
  export default new Config();
  