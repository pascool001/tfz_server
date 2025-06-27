const {ProfilRepo} = require("../repository");



const GenProfils = async () => {

    let codeProfilCreated = []

    let ProfilList = [];

    const appliProfils = [
        {code_profil: "GERANT", desi_profil: "Gestion du SPM", desc_profil: "individu ayant fait l'acquisition du SPM"},
        {code_profil: "CHAUFFEUR", desi_profil: "Chauffeur associé au système (SPM)", desc_profil: "Chauffeur principal ou secondaire associé au SPM"},
        {code_profil: "CLIENT", desi_profil: "Client", desc_profil: "Usager de l'appli en vu de paiement des frais de transport"},
        {code_profil: "BO-ADMIN", desi_profil: "Adminstrateur", desc_profil: "Adminstrateur Backoffice"},
        {code_profil: "BO", desi_profil: "Utilisateur backoffice", desc_profil: "Utilisateur Backoffice"},
    ]

    const CodeProfilsToCreate = appliProfils.map(item => item.code_profil);
    
    try { 
        ProfilList = await ProfilRepo.getAll();
        codeProfilCreated = ProfilList.map(elmt => elmt.code_profil);
    } catch (error) {}

    CodeProfilsToCreate.forEach(async (code) => {
            if (codeProfilCreated.indexOf(code) == -1) {
                try {
                    const data = appliProfils.find(el => el.code_profil == code )
                    await ProfilRepo.create(data)
                    console.log(`Profil ${data.code_profil} successfully created!`)
            } catch (error) {
                console.log(`Could not create profil ${code}`)
            }
        }
    })


}

module.exports = GenProfils


