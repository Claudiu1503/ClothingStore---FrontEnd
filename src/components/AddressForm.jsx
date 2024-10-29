// AddressForm.jsx
const AddressForm = ({ address, onChange }) => {
        return (
            <div className="address-form">
                    <input
                        type="text"
                        name="state"
                        value={address?.state || ''}
                        placeholder="State"
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="zip"
                        value={address?.zip || ''}
                        placeholder="ZIP Code"
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="country"
                        value={address?.country || ''}
                        placeholder="Country"
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="city"
                        value={address?.city || ''}
                        placeholder="City"
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="addressLine"
                        value={address?.addressLine || ''}
                        placeholder="Address Line"
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        value={address?.phone || ''}
                        placeholder="Phone"
                        onChange={onChange}
                    />
            </div>
        );
};

export default AddressForm;
