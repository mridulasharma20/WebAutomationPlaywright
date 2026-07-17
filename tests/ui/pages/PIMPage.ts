import { Page, Locator } from '@playwright/test';

export class PIMPage {
  private readonly page: Page;

  // ==================== Navigation ====================
  private readonly pimMenuLinkLocator: Locator;

  // ==================== Employee List ====================
  private readonly employeeTableLocator: Locator;
  private readonly employeeTableRowsLocator: Locator;
  private readonly recordsFoundTextLocator: Locator;
  private readonly noRecordsFoundMessageLocator: Locator;

  // ==================== Search Fields ====================
  private readonly employeeNameSearchFieldLocator: Locator;
  private readonly employeeIdSearchFieldLocator: Locator;
  private readonly employmentStatusDropdownLocator: Locator;
  private readonly employmentStatusDropdownAltLocator: Locator;

  // ==================== Buttons ====================
  private readonly searchButtonLocator: Locator;
  private readonly resetButtonLocator: Locator;
  private readonly addEmployeeButtonLocator: Locator;
  private readonly saveButtonLocator: Locator;
  private readonly cancelButtonLocator: Locator;
  private readonly nextPageButtonLocator: Locator;
  private readonly previousPageButtonLocator: Locator;

  // ==================== Add Employee Form ====================
  private readonly firstNameFieldLocator: Locator;
  private readonly middleNameFieldLocator: Locator;
  private readonly lastNameFieldLocator: Locator;
  private readonly employeeIdFieldLocator: Locator;
  private readonly createLoginCheckboxLocator: Locator;
  private readonly loginUsernameFieldLocator: Locator;
  private readonly loginPasswordFieldLocator: Locator;
  private readonly loginFieldsLocator: Locator;
  private readonly fileUploadInputLocator: Locator;
  private readonly successToastLocator: Locator;

  // ==================== Table Headers & Pagination ====================
  private readonly tableHeaderCheckboxLocator: Locator;
  private readonly firstRowIdCellLocator: Locator;

 // private recordsFoundTextLocator :Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize Navigation
    this.pimMenuLinkLocator = this.page.locator('a.oxd-main-menu-item', { hasText: 'PIM' }).first();

    // Initialize Employee List
    this.employeeTableLocator = this.page.locator('table');
    this.employeeTableRowsLocator = this.page.locator('table tbody tr');
    this.recordsFoundTextLocator = this.page.locator( 'span.oxd-text:has-text("Records Found")');
    this.noRecordsFoundMessageLocator = this.page.locator('text=No Records Found');

    // Initialize Search Fields
    //this.employeeNameSearchFieldLocator = this.page.locator('input[placeholder*="Type for hints"]').first();
   this.employeeNameSearchFieldLocator = this.page.getByRole('textbox', { name: 'Type for hints...' }).first()
    this.employeeIdSearchFieldLocator = this.page.locator('input[placeholder*="Type for hints"]').nth(1);
    this.employmentStatusDropdownLocator = this.page.locator('div[class*="Employment Status"]').locator('..').locator('div[role="combobox"]');
    this.employmentStatusDropdownAltLocator = this.page.locator('xpath=//label[contains(text(), "Employment Status")]/following::div[@role="combobox"]');

    // Initialize Buttons
    this.searchButtonLocator = this.page.locator('button:has-text("Search")');
    this.resetButtonLocator = this.page.locator('button:has-text("Reset")');
    this.addEmployeeButtonLocator = this.page.locator('button:has-text("Add")');
    this.saveButtonLocator = this.page.locator('button:has-text("Save")');
    this.cancelButtonLocator = this.page.locator('button:has-text("Cancel")');
    this.nextPageButtonLocator = this.page.locator('button:has-text("Next")');
    this.previousPageButtonLocator = this.page.locator('button:has-text("Previous")');

    // Initialize Add Employee Form
    this.firstNameFieldLocator = this.page.locator('input[placeholder="First Name"]');
    this.middleNameFieldLocator = this.page.locator('input[placeholder="Middle Name"]');
    this.lastNameFieldLocator = this.page.locator('input[placeholder="Last Name"]');
    this.employeeIdFieldLocator = this.page.locator('input[class*="id"]').last();
    this.createLoginCheckboxLocator = this.page.locator('input[type="checkbox"]');
    this.loginUsernameFieldLocator = this.page.locator('input[name*="username"]').last();
    this.loginPasswordFieldLocator = this.page.locator('input[name*="password"]').last();
    this.loginFieldsLocator = this.page.locator('input[placeholder*="username"], input[placeholder*="password"]');
    this.fileUploadInputLocator = this.page.locator('input[type="file"]');
    this.successToastLocator = this.page.locator('.oxd-toast, [role="alert"]').first();

    // Initialize Table Headers & Pagination
    this.tableHeaderCheckboxLocator = this.page.locator('table thead input[type="checkbox"]').first();
    this.firstRowIdCellLocator = this.page.locator('table tbody tr:first-child td:nth-child(2)');
  }

  // ==================== Getter Methods ====================

  /**
   * PIM menu link
   */
  get pimMenuLink(): Locator {
    return this.pimMenuLinkLocator;
  }

  /**
   * Employee list table
   */
  get employeeTable(): Locator {
    return this.employeeTableLocator;
  }

  /**
   * Employee table body rows
   */
  get employeeTableRows(): Locator {
    return this.employeeTableRowsLocator;
  }

  /**
   * Records found text
   */
  get recordsFoundText(): Locator {
    return this.recordsFoundTextLocator;
  }

  /**
   * No records found message
   */
  get noRecordsFoundMessage(): Locator {
    return this.noRecordsFoundMessageLocator;
  }

  /**
   * Employee name search field
   */
  get employeeNameSearchField(): Locator {
    return this.employeeNameSearchFieldLocator;
  }

  /**
   * Employee ID search field
   */
  get employeeIdSearchField(): Locator {
    return this.employeeIdSearchFieldLocator;
  }

  /**
   * Employment status dropdown
   */
  get employmentStatusDropdown(): Locator {
    return this.employmentStatusDropdownLocator;
  }

  /**
   * Employment status dropdown (alternative locator)
   */
  get employmentStatusDropdownAlt(): Locator {
    return this.employmentStatusDropdownAltLocator;
  }

  /**
   * Search button
   */
  get searchButton(): Locator {
    return this.searchButtonLocator;
  }

  /**
   * Reset button
   */
  get resetButton(): Locator {
    return this.resetButtonLocator;
  }

  /**
   * Add Employee button
   */
  get addEmployeeButton(): Locator {
    return this.addEmployeeButtonLocator;
  }

  /**
   * Save button
   */
  get saveButton(): Locator {
    return this.saveButtonLocator;
  }

  /**
   * Cancel button
   */
  get cancelButton(): Locator {
    return this.cancelButtonLocator;
  }

  /**
   * Next page button
   */
  get nextPageButton(): Locator {
    return this.nextPageButtonLocator;
  }

  /**
   * Previous page button
   */
  get previousPageButton(): Locator {
    return this.previousPageButtonLocator;
  }

  /**
   * First name input field
   */
  get firstNameField(): Locator {
    return this.firstNameFieldLocator;
  }

  /**
   * Middle name input field
   */
  get middleNameField(): Locator {
    return this.middleNameFieldLocator;
  }

  /**
   * Last name input field
   */
  get lastNameField(): Locator {
    return this.lastNameFieldLocator;
  }

  /**
   * Employee ID field
   */
  get employeeIdField(): Locator {
    return this.employeeIdFieldLocator;
  }

  /**
   * Create Login Details checkbox
   */
  get createLoginCheckbox(): Locator {
    return this.createLoginCheckboxLocator;
  }

  /**
   * Username field for login (in Add Employee form)
   */
  get loginUsernameField(): Locator {
    return this.loginUsernameFieldLocator;
  }

  /**
   * Password field for login (in Add Employee form)
   */
  get loginPasswordField(): Locator {
    return this.loginPasswordFieldLocator;
  }

  /**
   * Login fields (username and password combined)
   */
  get loginFields(): Locator {
    return this.loginFieldsLocator;
  }

  /**
   * File upload input
   */
  get fileUploadInput(): Locator {
    return this.fileUploadInputLocator;
  }

  /**
   * Success toast message after save/create actions
   */
  get successToast(): Locator {
    return this.successToastLocator;
  }

  /**
   * Table header checkboxes
   */
  get tableHeaderCheckbox(): Locator {
    return this.tableHeaderCheckboxLocator;
  }

  /**
   * First row ID cell
   */
  get firstRowIdCell(): Locator {
    return this.firstRowIdCellLocator;
  }

  // ==================== Helper Methods ====================

  /**
   * Get column header by name
   */
  getColumnHeader(columnName: string): Locator {
    return this.page.locator(`columnheader:has-text("${columnName}")`);
  }

  /**
   * Get text element by exact text
   */
  getTextElement(text: string): Locator {
    return this.page.locator(`text="${text}"`);
  }

  /**
   * Get text element by partial match
   */
  getTextElementPartial(text: string): Locator {
    return this.page.locator(`text=${text}`);
  }

  /**
   * Get error message for a specific field
   */
  getFieldErrorMessage(fieldLabel: string): Locator {
    return this.page.locator(`text="${fieldLabel}"`).locator('..').locator('text=Required');
  }
}
