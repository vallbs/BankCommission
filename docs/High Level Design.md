# High-Level Design Document

## 1. Introduction
- The project aims to implement a system for handling cash-in and cash-out operations for bank users.
- Key functionalities include commission fee calculation based on user type, cash-in, and cash-out operations (including additional logic for total amount per user per period).

## 2. System Architecture
- The system follows a modular architecture with a focus on flexibility and extensibility.
- Major components include:
  - **Cash In:**
    - `CashInCommission`: Handles commission calculation for cash-in operations.
    - `CashInStrategy`: Defines the strategy for calculating cash-in fees.
  - **Cash Out:**
    - `CashOutFactory`: Factory for creating cash-out strategies based on user type.
    - `JuridicalUserCashOutFee` and `NaturalUserCashOutFee`: Strategies for calculating cash-out fees for legal and natural persons.
  - **Commission Fee Calculation:**
    - `TypeFactory`: Factory for creating strategies based on operation types.
    - `CommissionFee`: Orchestrates the commission fee calculation process.

## 3. Data Flow
- The system interacts with data through the `DataService`.

## 4. Configuration Management
- Input data is getting from the file provided in node run command.

## 5. Concurrency and Scalability
- The system is designed to handle concurrent operations through modular components.
- Strategies for cash-out operations are designed to be extensible for scalability.

## 6. Error Handling and Logging
- Error handling to be done.
- Logging to be done (is used for debugging and monitoring purposes).

## 7. Performance Considerations
- **To be done. Edit this section on adding stream read of huge file of data**. 
- Performance is optimized through efficient algorithms for fee calculation.
- Caching mechanisms may be implemented to enhance performance.

## 8. Testing Strategy
- Unit tests cover individual components, ensuring the correctness of fee calculations.
