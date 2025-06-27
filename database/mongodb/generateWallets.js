const {WalletRepo} = require("../repository");



const GenWallets = async () => {

    let codeWalletCreated = []

    let WalletList = [];

    const appliWallets = [
        {code_profil: "GERANT", desi_profil: "Gestion du SPM", desc_profil: "individu ayant fait l'acquisition du SPM"},
        {code_profil: "CHAUFFEUR", desi_profil: "Chauffeur associé au système (SPM)", desc_profil: "Chauffeur principal ou secondaire associé au SPM"},
        {code_profil: "CLIENT", desi_profil: "Client", desc_profil: "Usager de l'appli en vu de paiement des frais de transport"},
        {code_profil: "BO-ADMIN", desi_profil: "Adminstrateur", desc_profil: "Adminstrateur Backoffice"},
        {code_profil: "BO", desi_profil: "Utilisateur backoffice", desc_profil: "Utilisateur Backoffice"},
    ]

    const CodeProfilsToCreate = appliWallets.map(item => item.code_profil);
    
    try { 
        WalletList = await WalletRepo.getAll();
        codeWalletCreated = WalletList.map(elmt => elmt.code_profil);
    } catch (error) {}

    CodeProfilsToCreate.forEach(async (code) => {
            if (codeWalletCreated.indexOf(code) == -1) {
                try {
                    const data = appliWallets.find(el => el.code_profil == code )
                    await WalletRepo.create(data)
                    console.log(`Profil ${data.code_profil} successfully created!`)
            } catch (error) {
                console.log(`Could not create profil ${code}`)
            }
        }
    })


}

module.exports = GenWallets


