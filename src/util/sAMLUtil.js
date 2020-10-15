const xmlParser = require('fast-xml-parser');

function parseMetaData (samlMetaData){
    var options = {
        attributeNamePrefix : "attr_",
        ignoreAttributes : false,
        ignoreNameSpace: true
    }
    var idpMetaData = {};


    //TODO: double check if we need to dynamically change the name space --Venu
    const BINDING_HTTP_POST = "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST";
    const BINDING_HTTP_REDIRECT = "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect";
    
    
    const metaDataObj = xmlParser.parse(samlMetaData, options);
    
    // Audience URI
    const audienceUrl = metaDataObj.EntityDescriptor.attr_entityID;

    
    
    // SAML REDIRECT URL and POST URL
    const samlBindings = metaDataObj.EntityDescriptor.IDPSSODescriptor.SingleSignOnService;
    const postUrl = samlBindings.filter(binding => binding.attr_Binding == BINDING_HTTP_POST).map(binding => binding.attr_Location);
    const redirectUrl = samlBindings.filter(binding => binding.attr_Binding == BINDING_HTTP_REDIRECT).map(binding => binding.attr_Location);  

    idpMetaData = {
        ...idpMetaData, 
        "audienceUrl": audienceUrl, 
        "postUrl": postUrl.length > 0 ? postUrl[0] : null, 
        "redirectUrl":redirectUrl.length > 0 ? redirectUrl[0] : null
    }
    return idpMetaData;
}
export {parseMetaData} ;