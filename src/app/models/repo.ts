export class Repo {
     constructor(
        public id: string,
        public name: string,
        public description: string,
        public url: string,
        public language: String,
        public stargazers_count: string,
        public forks_count: string,
        public created_at: string,
        public updated_at: string
    ) { }

    getLanguageIcon(): string {
        var _return: string = "blank";
        switch (this.language) {
            case "JavaScript":
                _return = "js"
                break;
            case "Swift":
                _return = "swift"
                break;
            case "TypeScript":
                _return = "node"
                break;
            case "CSS":
                _return = "css"
                break;
            case "CSS3":
                _return = "css3"
                break;
            case "PHP":
                _return = "php"
                break;
            case "HTML":
                _return = "html"
                break;
        
            default:
                _return = "blank"
                break;
        }

        return _return;
    }
}
