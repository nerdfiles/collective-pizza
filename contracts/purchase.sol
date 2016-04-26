/**(
 * @fileOverview ./contracts/priceChargeSpecification.sol
 * @description
 * Collective Pizza Emission Contract.
 * )
 */

contract PriceChargeSpecification {

  uint public value;
  address public seller;
  address public buyer;
  enum State { Created, Locked, Inactive }
  State public state;

  function PriceChargeSpecification () {
    /// @constructor
    /// @description
    seller = msg.sender;
    value = msg.value / 2;
    if (2 * value != msg.value) throw;
  }

  modifier require (bool _condition) {
    if (!_condition) throw;
    _
  }

  modifier onlyBuyer () {
    if (msg.sender != buyer) throw;
    _
  }

  modifier onlySeller () {
    if (msg.sender != seller) throw;
    _
  }

  modifier inState (State _state) {
    if (state != _state) throw;
    _
  }

  event aborted();
  event priceChargeSpecificationCommitted();
  event itemReceived();

  function abort () onlySeller inState (State.Created) {
    /// @description
    /// Abort the priceChargeSpecification and reclaim the ether. Can only be called by the seller before
    /// the contract is locked.
    aborted();
    seller.send(this.balance);
    state = State.Inactive;
  }


  function priceChargeSpecificationCommit () inState (State.Created) require (msg.value == 2 * value) {
    /// @description
    /// Confirm the priceChargeSpecification as buyer. Transaction has to include `2 * value` ether.
    /// The ether will be locked until confirmReceived is called.
    priceChargeSpecificationCommitted();
    buyer = msg.sender;
    state = State.Locked;
  }


  function priceChargeSpecificationPush () onlyBuyer inState (State.Locked) {
    /// @description
    /// Confirm that you (the buyer) received the item.
    /// This will release the locked ether.
    itemReceived();
    buyer.send(value);
    seller.send(this.balance);
    state = State.Inactive;
  }


  function() { throw; }
}

