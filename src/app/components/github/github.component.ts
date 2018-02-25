import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

//model
import { Repo } from '../../models/repo';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {

  private username = "eduardochiaro"
  repos: any[] = [];
  reposcount: number = 0;

  constructor(private githubService: GithubService) { }

  ngOnInit() {

    this.githubService.getRepositories(this.username).subscribe(
        repos => {
          this.sortRepos(repos);
        }
      );
  }

  private sortRepos(repos: any[]){
    
    var counter = 1;
    this.reposcount = repos.length;

    repos.forEach(element => {

      if (element.owner.login == this.username) {
        if (counter > 6) {
          return;
        }
        var repo = new Repo(
            element.id,
            element.name,
            element.description,
            element.html_url,
            element.language,
            element.stargazers_count,
            element.forks_count,
            element.created_at,
            element.updated_at
        );

        this.repos.push(repo);
        
        counter ++;
      }
    });
  }
}
