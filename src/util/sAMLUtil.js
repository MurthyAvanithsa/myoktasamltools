const xmlParser = require('fast-xml-parser');

function parseMetaData(samlMetaData) {
    var options = {
        attributeNamePrefix: "attr_",
        ignoreAttributes: false,
        ignoreNameSpace: true
    }
    var metaDataOptions = {};


    //TODO: double check if we need to dynamically change the name space --Venu
    const BINDING_HTTP_POST = "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST";
    const BINDING_HTTP_REDIRECT = "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect";
    const DESCRIPTOR_TYPE_SP = "SPSSODescriptor";
    const DESCRIPTOR_TYPE_IDP = "IDPSSODescriptor";


    const metaDataObj = xmlParser.parse(samlMetaData, options);

    if (DESCRIPTOR_TYPE_SP in metaDataObj.EntityDescriptor) {
        metaDataOptions = { ...metaDataOptions, "metaType": "SP" }
        const assertionConsumerURL = metaDataObj.EntityDescriptor.SPSSODescriptor.AssertionConsumerService.attr_Location;
        metaDataOptions = {
            ...metaDataOptions,
            "SPOptions": {
                "assertionConsumerSrv": assertionConsumerURL,
            }
        }
    } else if (DESCRIPTOR_TYPE_IDP in metaDataObj.EntityDescriptor) {
        metaDataOptions = { ...metaDataOptions, "metaType": "IDP" }
        const audienceUrl = metaDataObj.EntityDescriptor.attr_entityID;

        // SAML REDIRECT URL and POST URL
        const samlBindings = metaDataObj.EntityDescriptor.IDPSSODescriptor.SingleSignOnService;
        const postUrl = samlBindings.filter(binding => binding.attr_Binding == BINDING_HTTP_POST).map(binding => binding.attr_Location);
        const redirectUrl = samlBindings.filter(binding => binding.attr_Binding == BINDING_HTTP_REDIRECT).map(binding => binding.attr_Location);

        metaDataOptions = {
            ...metaDataOptions,
            "IDPOptions": {
                "audienceUrl": audienceUrl,
                "postUrl": postUrl.length > 0 ? postUrl[0] : null,
                "redirectUrl": redirectUrl.length > 0 ? redirectUrl[0] : null
            }
        }
    }
    // Process if DESCRIPTOR_TYPE_IDP
    // Audience URI

    return metaDataOptions;
}
export { parseMetaData };