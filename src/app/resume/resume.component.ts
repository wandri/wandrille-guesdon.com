import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

// @ts-ignore
import * as skrollr from 'skrollr';
import * as $ from 'jquery'
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {SvgRegistryService} from './svg-registry.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  frenchResume: any = {};
  englishResume: any = {};
  germanResume: any = {};
  language = 'french';
  overlay = true;

  constructor(
    private titleService: Title,
    private router: Router,
    private element: ElementRef,
    private renderer: Renderer2,
    private svgService: SvgRegistryService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Wandrille • Resume');
    this.getResumeGlobal();
    this.setResumeDrawings();
  }

  getFlag(country: string) {
    return '../../assets/images/flag-' + country + '.svg';
  }

  private setResumeDrawings() {
    window.scrollTo(0, 0);
    if (window.innerWidth > 670) {

      this.loadScene1();
      this.loadScene2();
      this.loadScene3();
      this.loadScene4();
      this.loadScene5();
      this.loadNavbarFooter();

      this.initiateSceneAtStart();

    } else {
      this.overlay = false;
    }
  }

  private initiateSceneAtStart() {
    setTimeout(() => {
      skrollr.init({
        forceHeight: false
      }).refresh();
      window.scrollTo(0, 0);
      this.overlay = false;
      $('#scene1 #scroll-cursor').attr({
        'style': '-webkit-animation-name: mouse-movement;-webkit-animation-duration: 4s;animation-name: mouse-movement;\
          animation-duration: 5s;'
      });
      $('#scene1 #scroll-bar').attr({
        'style': 'fill:#3498DB;-webkit-animation-name: scroll-movement;-webkit-animation-duration: 4s;animation-name: scroll-movement;\
          animation-duration: 5s;'
      });
    }, 2000);
  }

  private loadScene1() {
    this.svgService.loadSvg('../assets/images/scene1.svg').subscribe(svg => {
      this.setSvg(svg, 'scene1');
      $('#scene1 svg').css({'height': '100vh', 'width': '100vw'});
      $('#scene1').attr({'data-0': 'top: 0%; ', 'data-400': 'top: 0%; ', 'data-900': 'top: -100%; '});
      $('#scene1 #inspired').attr({
        'data-0': 'transform[swing]: translate(0px, 0px); opacity: 1',
        'data-100': 'transform[swing]: translate(100px, 30px); opacity: 0'
      });
      $('#scene1 #scroll-mouse').attr({
        'data-0': ' transform[swing]: translate(0px, 0px); opacity: 1',
        'data-100': 'transform[swing]: translate(30px, 30px); opacity: 0'
      });
      $('#scene1 #text #text-hello').attr({
        'data-0': ' transform[swing]: translate(300px, -100px)',
        'data-100': 'transform[swing]: translate(0px, 0px);'
      });
      $('#scene1 #text #text-engineer').attr({
        'data-100': 'transform[swing]: translate(0px, -10px);opacity: 0;',
        'data-200': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene1 #text #text-developer').attr({
        'data-120': 'transform[swing]: translate(0px, -10px);opacity: 0;',
        'data-170': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene1 #calculator').attr({
        'data-100': 'transform[swing]: translate(300px, 200px) rotate(30deg); opacity: 0;',
        'data-200': 'transform[swing]: translate(0px, 0px) rotate(0deg); opacity:1'
      });
      $('#scene1 #helmet').attr({
        'data-120': 'transform[swing]: translate(-600px, 100px) rotate(-60deg);opacity: 0;',
        'data-240': 'transform[swing]: translate(0px, 0px) rotate(0deg); opacity:1'
      });
      $('#scene1 #phone').attr({
        'data-120': 'transform[swing]: translate(-600px, 100px) rotate(-60deg);opacity: 0;',
        'data-240': 'transform[swing]: translate(0px, 0px) rotate(0deg); opacity:1'
      });
      $('#scene1 #map-construction').attr({
        'data-50': 'transform[swing]: translate(-300px, -500px) rotate(-10deg);  ;opacity: 0;',
        'data-150': 'transform[swing]: translate(0px, 0px) rotate(0deg); opacity:1'
      });
      $('#scene1 #paper-2').attr({
        'data-90': 'transform[swing]: translate(300px, -500px) rotate(30deg);  ;opacity: 0;',
        'data-160': 'transform[swing]: translate(0px, 0px) rotate(0deg); opacity:1'
      });
      $('#scene1 #pensil').attr({
        'data-80': 'transform[swing]: translate(-300px, -200px) rotate(-30deg);opacity: 0;',
        'data-180': 'transform[swing]: translate(0px, 0px) rotate(0deg); opacity:1'
      });
      $('#scene1 #paper-1').attr({
        'data-120': 'transform[swing]: translate(400px, -10px) rotate(-60deg);opacity: 0;',
        'data-220': 'transform[swing]: translate(0px, 0px) rotate(0deg); opacity:1'
      });
      let scene1Path = $('#scene1 #path1 path');
      scene1Path.attr({'data-200': 'stroke-dashoffset: 2000;', 'data-700': 'stroke-dashoffset: 0;'});
      scene1Path.css({'stroke-dasharray': '2000'});
    });
  }

  private loadScene2() {
    this.svgService.loadSvg('../assets/images/scene2.svg').subscribe(svg => {
      this.setSvg(svg, 'scene2');
      $('#scene2 svg').css({'height': '100vh', 'width': '100vw'});
      let scene2 = $('#scene2');
      scene2.attr({
        'data-400': 'top: 100%; ',
        'data-900': 'top: 0%; ',
        'data-1500': 'top: 0%; ',
        'data-2500': 'top: -100%; '
      });
      scene2.css({'bakground-color': '#44C650'});
      let scene2Path = $('#scene2 #path2 path');
      scene2Path.attr({'data-580': 'stroke-dashoffset: 6000;', 'data-2680': 'stroke-dashoffset: 0;'});
      scene2Path.css({'stroke-dasharray': '6000'});
      $('#scene2 #estp').attr({
        'data-920': 'opacity: 0; transform[swing]: translate(-30px, 0px);',
        'data-950': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene2 #tud').attr({
        'data-1020': 'opacity: 0; transform[swing]: translate(0px, -30px);',
        'data-1050': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene2 #escp').attr({
        'data-1180': 'opacity: 0; transform[swing]: translate(0px, 30px);',
        'data-1210': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
    });
  }

  private loadScene3() {
    this.svgService.loadSvg('../assets/images/scene3.svg').subscribe(svg => {
      this.setSvg(svg, 'scene3');
      $('#scene3 svg').css({'height': '100vh', 'width': '100vw'});
      $('#scene3').attr({
        'data-1500': 'top: 100%; ',
        'data-2500': 'top: 0%; ',
        'data-4000': 'top: 0%; ',
        'data-5000': 'top: -100%; '
      });
      let scene3Path = $('#scene3 #path3 path');
      scene3Path.attr({'data-1720': 'stroke-dashoffset: 6000;', 'data-5680': 'stroke-dashoffset: 0;'});
      scene3Path.css({'stroke-dasharray': '6000'});
      $('#scene3 #bulle').attr({
        'data-1990': 'transform[swing]: translate(-30px, 0px);opacity: 0;',
        'data-2030': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene3 #people g').each(function (index) {
        const dataStart = 'data-' + (2230 + index * 5).toString();
        const dataEnd = 'data-' + (2238 + index * 5).toString();
        const attr: Record<string, string> = {};
        attr[dataStart] = 'transform[swing]: translate(-10px, 10px);opacity: 0;';
        attr[dataEnd] = 'transform[swing]: translate(0px, 0px);opacity: 1;';
        $(this).attr(attr);
      });
      $('#scene3 #curtain').attr({
        'data-2290': 'transform[swing]: translate(0px, 0px) scaleY(1)',
        'data-2350': 'transform[swing]: translate(0px, -30px) scaleY(0.3)'
      });
      $('#scene3 #bim').attr({
        'data-2690': 'transform[swing]: translate(-50px, 50px);opacity: 0;',
        'data-2740': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene3 #text-fleche').attr({
        'data-2800': 'transform[swing]: translate(0px, 50px);opacity: 0;',
        'data-2860': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene3 #helmet-3').attr({
        'data-3300': 'transform[swing]: translate(0px, 50px);opacity: 0;',
        'data-3350': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene3 #iot-helmet').attr({
        'data-3400': 'transform[swing]: translate(-50px, 50px);opacity: 0;',
        'data-3450': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene3 #signal-helmet').attr({
        'data-3500': 'transform[swing]: translate(0px, 0px);opacity: 0;',
        'data-3530': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene3 #signal-helmet').attr({
        'data-3600': 'transform[swing]: translate(0px, 0px);opacity: 0;',
        'data-3630': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene3 #roadware').attr({
        'data-3630': 'transform[swing]: translate(0px, -50px);opacity: 0;',
        'data-3690': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene3 #warning').attr({
        'data-3830': 'opacity: 0;', 'data-3860': 'opacity:1', 'data-3890': 'opacity: 0;',
        'data-3920': 'opacity:1', 'data-3960': 'opacity: 0;', 'data-3990': 'opacity:1', 'data-4020': 'opacity: 1;',
        'data-4050': 'opacity:0'
      });

    });
  }

  private loadScene4() {
    this.svgService.loadSvg('../assets/images/scene4.svg').subscribe(svg => {
      this.setSvg(svg, 'scene4');
      $('#scene4 svg').css({'height': '100vh', 'width': '100vw'});
      $('#scene4').attr({
        'data-4000': 'top: 100%; ',
        'data-5000': 'top: 0%; ',
        'data-6000': 'top: 0%; ',
        'data-6800': 'top: -100%; '
      });
      let scene4Path = $('#scene4 #path4 path');
      scene4Path.attr({'data-4342': 'stroke-dashoffset: 6000;', 'data-5680': 'stroke-dashoffset: 0;'});
      scene4Path.css({'stroke-dasharray': '6000'});
      $('#scene4 #text-code-1').attr({
        'data-4650': 'opacity:0;transform[swing]: translate(-50px, -50px)',
        'data-4750': 'opacity:1;transform[swing]: translate(0px, 0px)'
      });
      $('#scene4 #text-love-code').attr({
        'data-5650': 'opacity:0;transform[swing]: translate(-50px, -50px)',
        'data-5700': 'opacity:1;transform[swing]: translate(0px, 0px)'
      });
      $('#scene4 #nodejs').attr({
        'data-4950': 'opacity: 0; transform[swing]: translate(-30px, 30px);',
        'data-5000': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene4 #angular2').attr({
        'data-5000': 'opacity: 0; transform[swing]: translate(-30px, 30px);',
        'data-5050': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene4 #d3js').attr({
        'data-5050': 'opacity: 0; transform[swing]: translate(-30px, 30px);',
        'data-5100': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene4 #js-more-global').attr({
        'data-5100': 'opacity: 0; transform[swing]: translate(-30px, 30px);',
        'data-5150': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene4 #python').attr({
        'data-5150': 'opacity: 0; transform[swing]: translate(-30px, 30px);',
        'data-5200': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene4 #scrapy').attr({
        'data-5200': 'opacity: 0; transform[swing]: translate(-30px, 30px);',
        'data-5250': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene4 #python-more-global').attr({
        'data-5250': 'opacity: 0; transform[swing]: translate(-30px, 30px);',
        'data-5300': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene4 #js-more-dash-1').attr({
        'data-5300': 'transform[swing]: translate(0px, 0px);',
        'data-5320': 'transform[swing]: translate(0px, 5px);', 'data-5340': 'transform[swing]: translate(0px, -5px);',
        'data-5360': 'transform[swing]: translate(0px, 0px);'
      });
      $('#scene4 #js-more-dash-2').attr({
        'data-5340': 'transform[swing]: translate(0px, 0px);',
        'data-5360': 'transform[swing]: translate(0px, 5px);', 'data-5380': 'transform[swing]: translate(0px, -5px);',
        'data-5400': 'transform[swing]: translate(0px, 0px);'
      });
      $('#scene4 #js-more-dash-3').attr({
        'data-5380': 'transform[swing]: translate(0px, 0px);',
        'data-5400': 'transform[swing]: translate(0px, 5px);', 'data-5420': 'transform[swing]: translate(0px, -5px);',
        'data-5440': 'transform[swing]: translate(0px, 0px);'
      });
      $('#scene4 #python-more-dash-1').attr({
        'data-5460': 'transform[swing]: translate(0px, 0px);',
        'data-5480': 'transform[swing]: translate(0px, 5px);', 'data-5500': 'transform[swing]: translate(0px, -5px);',
        'data-5520': 'transform[swing]: translate(0px, 0px);'
      });
      $('#scene4 #python-more-dash-2').attr({
        'data-5500': 'transform[swing]: translate(0px, 0px);',
        'data-5520': 'transform[swing]: translate(0px, 5px);', 'data-5540': 'transform[swing]: translate(0px, -5px);',
        'data-5560': 'transform[swing]: translate(0px, 0px);'
      });
      $('#scene4 #python-more-dash-3').attr({
        'data-5540': 'transform[swing]: translate(0px, 0px);',
        'data-5560': 'transform[swing]: translate(0px, 5px);', 'data-5580': 'transform[swing]: translate(0px, -5px);',
        'data-5600': 'transform[swing]: translate(0px, 0px);'
      });
      $('#scene4 #light-laptop').attr({
        'data-4300': 'opacity:0.8',
        'data-4400': 'opacity:0.2',
        'data-4500': 'opacity:1',
        'data-4600': 'opacity:0.3',
        'data-4700': 'opacity:0.9',
        'data-4800': 'opacity:0',
        'data-4900': 'opacity:0.6',
        'data-5000': 'opacity:0.3',
        'data-5100': 'opacity:1',
        'data-5200': 'opacity:0.5',
        'data-5300': 'opacity:1',
        'data-5400': 'opacity:0.1',
        'data-5500': 'opacity:0.6',
        'data-5600': 'opacity:0.2',
        'data-5700': 'opacity:0.8',
        'data-5800': 'opacity:0.3',
        'data-5900': 'opacity:0.7',
        'data-6000': 'opacity:0',
        'data-6100': 'opacity:0.9',
        'data-6200': 'opacity:0.1',
        'data-6300': 'opacity:1',
        'data-6400': 'opacity:0'
      });
      $('#scene4 #mouse').attr({
        'data-4300': 'transform[swing]: translate(5px,5px);',
        'data-4400': 'transform[swing]: translate(0px, 0px);', 'data-4500': 'transform[swing]: translate(-5px,5px)',
        'data-4600': 'transform[swing]: translate(0px, 0px)', 'data-4700': 'transform[swing]: translate(5px,-5px)',
        'data-4800': 'transform[swing]: translate(0px, 0px);', 'data-4900': 'transform[swing]: translate(-5px,-5px)',
        'data-5000': 'transform[swing]: translate(0px, 0px);', 'data-5100': 'transform[swing]: translate(5px,0px)',
        'data-5200': 'transform[swing]: translate(0px, 0px);', 'data-5300': 'transform[swing]: translate(-5px,10px)',
        'data-5400': 'transform[swing]: translate(0px, 0px)', 'data-5500': 'transform[swing]: translate(-5px,0px)',
        'data-5600': 'transform[swing]: translate(0px, 0px);', 'data-5700': 'transform[swing]: translate(5px,5px);',
        'data-5800': 'transform[swing]: translate(0px, 0px);', 'data-5900': 'transform[swing]: translate(-5px,5px)',
        'data-6000': 'transform[swing]: translate(0px, 0px)', 'data-6100': 'transform[swing]: translate(5px,-5px)',
        'data-6200': 'transform[swing]: translate(0px, 0px);', 'data-6300': 'transform[swing]: translate(-5px,-5px)',
        'data-6400': 'transform[swing]: translate(0px, 0px);'
      });
      $('#scene4 #clavier rect').each(function () {
        for (let i = 0; i < 44; i++) {
          const random: any = Math.random();
          if (random < 0.04) {
            const dataStart = 'data-' + (4300 + i * 50).toString();
            const dataMid = 'data-' + (4320 + i * 50).toString();
            const dataEnd = 'data-' + (4340 + i * 50).toString();
            const attr: Record<string, string> = {};
            attr[dataStart] = 'fill: rgb(211, 212, 221)';
            attr[dataMid] = 'fill: rgb(117, 120, 135)';
            attr[dataEnd] = 'fill: rgb(211, 212, 221)';
            $(this).attr(attr);
          }
        }
      });
    });
  }

  private loadScene5() {
    this.svgService.loadSvg('../assets/images/scene5.svg').subscribe(svg => {
      this.setSvg(svg, 'scene5');
      $('#scene5 svg').css({'height': '100vh', 'width': '100vw'});
      let scene5 = $('#scene5');
      scene5.attr({'data-6000': 'top: 100%; ', 'data-6800': 'top: 0%'});
      scene5.css({'bakground-color': '#F5ECD9'});
      let scene5Path = $('#scene5 #circle-work');
      scene5Path.attr({'data-7100': 'stroke-dashoffset: 6000;', 'data-7300': 'stroke-dashoffset: 0;'});
      scene5Path.css({'stroke-dasharray': '6000'});
      $('#scene5 #success-7').attr({
        'data-6800': 'opacity: 0; transform[swing]: translate(-5px, 10px);',
        'data-6850': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene5 #success-8').attr({
        'data-6900': 'opacity: 0; transform[swing]: translate(-5px, 10px);',
        'data-6950': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene5 #success-9').attr({
        'data-7000': 'opacity: 0; transform[swing]: translate(-5px, 10px);',
        'data-7050': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene5 #arrow-work').attr({
        'data-6950': 'opacity: 9; transform[swing]: translate(0px, 30px);',
        'data-7000': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene5 #hire').attr({
        'data-7100': 'opacity: 0; transform[swing]: translate(0px, 30px);',
        'data-7150': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene5 #click-here-text').attr({
        'data-7150': 'opacity: 0; transform[swing]: translate(0px, 30px);',
        'data-7200': 'transform[swing]: translate(0px, 0px); opacity:1'
      });
      $('#scene5 #click-here').attr({
        'cursor': 'pointer'
      });
      $('#scene5 #click-here').click(() => {
        this.router.navigate(['/contact']);
      });
    });
  }

  private loadNavbarFooter() {
    this.svgService.loadSvg('../assets/images/navbar.svg').subscribe(svg => {
      this.setSvg(svg, 'navbar-footer');
      let navbarFooterPath = $('#navbar-footer svg');
      navbarFooterPath.css({'height': '100%', 'width': '100vw'});
      navbarFooterPath.attr({'data-0': 'opacity: 0', 'data-120': 'opacity: 1'});
      $('#navbar-footer #move-rect').attr({
        'data-0': 'transform[swing]: scaleX(1); ', 'data-400': 'transform[swing]: scaleX(5.1)',
        'data-1300': 'transform[swing]: scaleX(10.6)', 'data-4000': 'transform[swing]: scaleX(16.3)',
        'data-5700': 'transform[swing]: scaleX(23)', 'data-7000': 'transform[swing]: scaleX(31)'
      });
      $('#navbar-footer #move-color').attr({
        'data-0': 'fill: rgb(52, 152, 219)',
        'data-495': 'fill: rgb(52, 152, 219)',
        'data-500': 'fill: rgb(68, 198, 80)',
        'data-4200': 'fill: rgb(68, 198, 80)',
        'data-4205': 'fill: rgb(231, 76, 60)'
      });
      $('#navbar-footer #fix-color').attr({
        'data-0': 'fill: rgb(47, 117, 163)',
        'data-495': 'fill: rgb(47, 117, 163)',
        'data-500': 'fill: rgb(62, 139, 62)',
        'data-4200': 'fill: rgb(62, 139, 62)',
        'data-4205': 'fill: rgb(176, 56, 43)'
      });
      $('#navbar-footer #nav-text-1').click(function () {
        window.scrollTo(0, 400);
      });
      $('#navbar-footer #nav-text-2').click(function () {
        window.scrollTo(0, 1300);
      });
      $('#navbar-footer #nav-text-3').click(function () {
        window.scrollTo(0, 4000);
      });
      $('#navbar-footer #nav-text-4').click(function () {
        window.scrollTo(0, 5700);
      });
      $('#navbar-footer #nav-text-5').click(function () {
        window.scrollTo(0, 7600);
      });
      $('#navbar-footer #nav-text-4').attr({cursor: 'pointer'});
      $('#navbar-footer #nav-text-3').attr({cursor: 'pointer'});
      $('#navbar-footer #nav-text-2').attr({cursor: 'pointer'});
      $('#navbar-footer #nav-text-1').attr({cursor: 'pointer'});
      $('#navbar-footer #nav-text-5').attr({cursor: 'pointer'});
    });
  }

  private getResumeGlobal() {
    this.frenchResume.constructionExperience = [
      {
        'company': 'Eiffage Travaux public',
        'job': 'Assistant directeur de chantier et ingénieurs travaux',
        'description': 'Chantier principale : ouvrage d’infrastructure sous la voie Bastion. -	Responsable de commandes auprès de \
        fournisseurs. - Gestion de la sécurité sur le chantier et du suivi des équipes. -	Responsable du DOE. -	Création de plan \
        d’exécutions.Chantier secondaire : Aménagement du mur d’une trémie de la SNCF. -	Direction des exécutions et responsable \
        de l’avancement. -	Management de l’équipe (4 ouvriers, 1 conducteurs d’engins). -	Création de procédures de construction. \
        -	Responsable de la communication avec la SNCF.',
        'link': 'http://www.eiffageinfrastructures.com/',
        'date': '2014',
        'duration': '4 mois',
        'flag': 'fr',
      },
      {
        'company': 'Heinrich Walter Bau',
        'job': 'Compagnon et assistant conducteur de travaux',
        'description': 'Chantier Bâtiment neuf pour M.A.N :-	Intégration à une équipe de compagnon.-	Responsable sécurité.',
        'link': 'http://www.heinrich-walter.de/home.html',
        'date': '2013',
        'duration': '3 mois',
        'flag': 'de'
      }];
    this.frenchResume.otherExperience = [
      {
        'company': 'La FoncièreNumérique',
        'job': 'Lead dev / Ingénieur projet',
        'description': 'Premier développeur de l\'company, nous avons développé une plateforme de plusieurs applications ' +
          'pour du big data dans l\'immobilier (gestion des anomalies, SSO, data visualization...). Notre équipe de développement ' +
          'a atteint jusqu\'à 6 developpeurs, encadré par les methodes agiles (SCRUM). Pour  Les technologies ' +
          'utilisées sont les suivantes: Spring Boot, Kafka, Angular, Mongo, CirclCi, Rancher, Docker',
        'duration': '18 mois',
        'flag': 'fr'
      },
      {
        'company': 'Multiples projets',
        'job': 'dans la construction',
        'description': '-	Casque connecté pour réduire les accidents sur les chantiers. -	La disposition des fichiers IFC à la \
        domotique pour améliorer \
        la maison intelligente. -	Une application de suivis de l’IOT sur les routes (Aximum/Colas).',
        'date': '2016-2017',
        'duration': '8 mois',
        'flag': 'fr'
      },
      {
        'company': 'Merci Public',
        'job': 'Co-fondateur et CTO',
        'description': 'MERCI PUBLIC offre au public la possibilité de faire venir l’artiste de son choix dans sa ville, par un \
        système de pré-réservation qui fonctionne comme un appel. -	Responsable technique et technologique -	Management de 4 \
        stagiaires -	Réalisation de site web (angularJs/NodeJs)',
        'link': 'http://www.mercipublic.com',
        'date': '2016',
        'duration': '8 mois',
        'flag': 'fr'
      },
      {
        'company': 'Diverses missions',
        'description': '-	Réalisation de scripts de récoltes de données automatisées sur internet. -	Démarchage téléphonique',
        'link': 'http://www.mercipublic.com',
        'date': '2016-2013',
        'flag': 'fr'
      }];
    this.frenchResume.formation = [
      {
        'company': 'ESCP EUROPE',
        'description': 'Mastère Spécialisé Innover et Entreprendre (MSIE)',
        'date': '2015-2016',
        'flag': 'fr'
      }, {
        'company': 'Technische Universitât Dresden',
        'description': 'Diplôme d’ingénieur allemand en construction de la TUD avec une spécialisation en management de la \
        construction. Thèse de fin d’étude :\
         Armature en fibre de carbone - utilisation et système.',
        'date': '2014-2015',
        'flag': 'de'
      },
      {
        'company': 'ESTP Paris',
        'description': 'Diplôme d’ingénieur de l’ESTP spécialisé en Travaux public.',
        'date': '2013-2015',
        'flag': 'fr'
      }];
    this.frenchResume.skill = {
      'english': 'parlé et écrit',
      'german': 'parlé et écrit',
      'french': 'Langue maternelle',
      'software': 'Microsoft Office, Autocad, Ms-Project',
      'design': 'Photoshop, Illustrator',
      'computer': 'JavaScript, Python'
    };
    this.germanResume.constructionExperience = [
      {
        'company': 'Eiffage Travaux public',
        'job': 'Assistent des Bauleiters und der Ingenieuren',
        'description': 'Hauptbaustelle, Infrastrukturprojekte – Überbauungen -	Beschaffung von Materialien (HEB, Schutzgeländer, …) -\
        Gewährleistung der Sicherheit und der Kontrolle des Personals -	Bearbeitung der Enddokumentation -	\
        Erstellung von Durchführungsplänen Nebenbaustelle, Ausdehnung von Wänden -	Leitung von der Durchführung der Baustelle - \
        Manager von vier Arbeitern -	Erstellung von Bau-Durchführungsplänen -	Kommunikation mit der SNCF',
        'link': 'http://www.eiffageinfrastructures.com/',
        'date': '2014',
        'duration': '4 Monate',
        'flag': 'fr'
      },
      {
        'company': 'Heinrich Walter Bau',
        'job': 'Assistent des Bauleiters',
        'description': 'Baustelle für neue Gebäude für M.A.N: -	Assistent des Bauleiters -	Sicherheit',
        'link': 'http://www.heinrich-walter.de/home.html',
        'date': '2013',
        'duration': '3 Monate',
        'flag': 'de'
      }];
    this.germanResume.otherExperience = [
      {
        'company': 'La FoncièreNumérique',
        'job': 'Lead dev / Projekt Ingenieur',
        'description': 'First developer of my company, we develop a big data platform for real-estate with multiples applications ' +
          '(anomaly management, SSO, data vizualization...). The developer team (max 6 peoples) uses the SCRUM method. ' +
          'The technical stack used: Spring Boot, Kafka, Angular, Mongo, CirclCi, Rancher, Docker',
        'duration': '18 mois',
        'flag': 'fr'
      },
      {
        'company': 'Verschiedene Startup-Projekte',
        'job': 'im Bereich Bauwesen',
        'description': '-	Intelligente Kopfschutzhelme -	Applikation für die Gesundheit von Bau- IOT',
        'date': '2016-2017',
        'duration': '8 Monate',
        'flag': 'fr'
      },
      {
        'company': 'Merci Public',
        'job': 'Co-fondateur et CTO',
        'description': '-	Technischer und technologischer Manager  -	Betreuer von 4 Praktikanten -	Gestaltung der Website \
        (angularJs/NodeJs)',
        'link': 'http://www.mercipublic.com',
        'date': '2016',
        'duration': '8 Monate',
        'flag': 'fr'
      },
      {
        'company': 'Verschiedene Arbeiten',
        'description': '-	Scraping -	Telefon-Marketing',
        'link': 'http://www.mercipublic.com',
        'date': '2016-2013',
        'flag': 'fr'
      }];
    this.germanResume.formation = [
      {
        'company': 'ESCP EUROPE',
        'description': 'Spezialisierter Master in Innovation und Unternehmertum',
        'date': '2015-2016',
        'flag': 'fr'
      },
      {
        'company': 'Technische Universitât Dresden',
        'description': 'Ingenieurdiplom – Bauwesen. Diplomarbeit: Carbonbewehrung – Systeme und Einsatzmöglichkeiten (Note: 2,3)',
        'date': '2014-2015',
        'flag': 'de'
      },
      {
        'company': 'Ecole Spécial des Travaux Publics ',
        'description': 'Ingenieurdiplom – Bauwesen mit der Vertiefung Hochbau',
        'date': '2013-2015',
        'flag': 'fr'
      }];
    this.germanResume.skill = {
      'english': 'Gute Kenntnisse',
      'german': 'Gute Kenntnisse',
      'french': 'Muttersprache',
      'software': 'Microsoft Office, Autocad, Ms-Project',
      'design': 'Photoshop, Illustrator',
      'computer': 'JavaScript, Python'
    };
    this.englishResume.constructionExperience = [
      {
        'company': 'Eiffage Travaux public',
        'job': 'Site Engineer',
        'description': '- Organising and supervising material and human resources - Organising the site, \
        defining the schedule - Preparing construction and control plans - Liaising with clients, the local authority and \
        their representatives and subcontractors',
        'link': 'http://www.eiffageinfrastructures.com/',
        'date': '2014',
        'duration': '4 Months',
        'flag': 'fr'
      },
      {
        'company': 'Heinrich Walter Bau',
        'job': 'Site Engineer assistant',
        'description': '- Day-to-day management of the site',
        'link': 'http://www.heinrich-walter.de/home.html',
        'date': '2013',
        'duration': '3 Months',
        'flag': 'de'
      }];
    this.englishResume.otherExperience = [
      {
        'company': 'La FoncièreNumérique',
        'job': 'Lead dev / Project Engineer',
        'description': 'First developer of my company, we develop a big data platform for real-estate with multiples applications ' +
          '(anomaly management, SSO, data vizualization...). The developer team (max 6 peoples) uses the SCRUM method. ' +
          'The technical stack used: Spring Boot, Kafka, Angular, Mongo, CirclCi, Rancher, Docker',
        'duration': '18 mois',
        'flag': 'fr'
      },
      {
        'company': 'Different projects',
        'job': 'about construction',
        'description': '-	Smart security hat -	Application for the security on construction sites - IOT',
        'date': '2016-2017',
        'duration': '8 Months',
        'flag': 'fr'
      },
      {
        'company': 'Merci Public',
        'job': 'Cofunder and CTO',
        'description': '-	Management of the technological part -	Programmation of the fullstack website \
        (angularJs/NodeJs)',
        'link': 'http://www.mercipublic.com',
        'date': '2016',
        'duration': '8 Months',
        'flag': 'fr'
      },
      {
        'company': 'Other jobs',
        'description': '-	Scraping -	Phone-Marketing',
        'link': 'http://www.mercipublic.com',
        'date': '2016-2013',
        'flag': 'fr'
      }];
    this.englishResume.formation = [
      {
        'company': 'ESCP EUROPE',
        'description': 'Executive master in Innovation und Entrepreneurship',
        'date': '2015-2016',
        'flag': 'fr'
      },
      {
        'company': 'Technische Universitât Dresden',
        'description': 'German master’s degree in construction Processings.',
        'date': '2014-2015',
        'flag': 'de'
      },
      {
        'company': 'Ecole Spécial des Travaux Publics ',
        'description': 'French master’s degree in civil engineering',
        'date': '2013-2015',
        'flag': 'fr'
      }];
    this.englishResume.skill = {
      'english': 'speak, read and write',
      'german': 'speak, read and write',
      'french': 'native language',
      'software': 'Microsoft Office, Autocad, Ms-Project',
      'design': 'Photoshop, Illustrator',
      'computer': 'JavaScript, Python'
    };
  }

  private setSvg(svg: SVGElement, id: string) {
    const icon = <SVGElement>svg.cloneNode(true);
    const svgDocument = document.getElementById(id);
    this.renderer.appendChild(svgDocument, icon);
  }

}
