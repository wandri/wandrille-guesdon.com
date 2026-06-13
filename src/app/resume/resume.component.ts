import {ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID, Renderer2, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {forkJoin} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {SvgRegistryService} from './svg-registry.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private titleService = inject(Title);
  private router = inject(Router);
  private renderer = inject(Renderer2);
  private svgService = inject(SvgRegistryService);

  frenchResume: Record<string, unknown> = {};
  englishResume: Record<string, unknown> = {};
  germanResume: Record<string, unknown> = {};
  language = signal('french');
  overlay = signal(true);

  ngOnInit() {
    this.titleService.setTitle('Wandrille â€¢ Resume');
    this.getResumeGlobal();
    if (isPlatformBrowser(this.platformId)) {
      this.setResumeDrawings();
    }
  }

  getFlag(country: string) {
    return 'assets/images/flag-' + country + '.svg';
  }

  private setResumeDrawings() {
    window.scrollTo(0, 0);
    if (window.innerWidth > 670) {
      this.loadAndAnimate();
    } else {
      this.overlay.set(false);
    }
  }

  private async loadAndAnimate() {
    const {default: $} = await import('jquery');
    forkJoin({
      scene1: this.svgService.loadSvg('assets/images/scene1.svg'),
      scene2: this.svgService.loadSvg('assets/images/scene2.svg'),
      scene3: this.svgService.loadSvg('assets/images/scene3.svg'),
      scene4: this.svgService.loadSvg('assets/images/scene4.svg'),
      scene5: this.svgService.loadSvg('assets/images/scene5.svg'),
      navbar: this.svgService.loadSvg('assets/images/navbar.svg'),
    }).subscribe(async ({scene1, scene2, scene3, scene4, scene5, navbar}) => {
      this.appendSvg(scene1, 'scene1');
      this.appendSvg(scene2, 'scene2');
      this.appendSvg(scene3, 'scene3');
      this.appendSvg(scene4, 'scene4');
      this.appendSvg(scene5, 'scene5');
      this.appendSvg(navbar, 'navbar-footer');

      $('#scene1 svg, #scene2 svg, #scene3 svg, #scene4 svg, #scene5 svg').css({height: '100vh', width: '100vw'});
      $('#navbar-footer svg').css({height: '100%', width: '100vw'});

      $('#scene1 #path1 path').css({'stroke-dasharray': '2000'});
      $('#scene2 #path2 path, #scene3 #path3 path, #scene4 #path4 path').css({'stroke-dasharray': '6000'});
      $('#scene5 #circle-work').css({'stroke-dasharray': '6000'});

      $('#scene5 #click-here').css({cursor: 'pointer'}).on('click', () => this.router.navigate(['/contact']));
      (['nav-text-1', 'nav-text-2', 'nav-text-3', 'nav-text-4', 'nav-text-5']).forEach(id =>
        $(`#navbar-footer #${id}`).css({cursor: 'pointer'})
      );
      $('#navbar-footer #nav-text-1').on('click', () => window.scrollTo(0, 400));
      $('#navbar-footer #nav-text-2').on('click', () => window.scrollTo(0, 1300));
      $('#navbar-footer #nav-text-3').on('click', () => window.scrollTo(0, 4000));
      $('#navbar-footer #nav-text-4').on('click', () => window.scrollTo(0, 5700));
      $('#navbar-footer #nav-text-5').on('click', () => window.scrollTo(0, 7600));

      // Collect per-element data before async
      const people = $('#scene3 #people g').toArray();
      const keyAnims: {el: Element; s: number; m: number; e: number}[] = [];
      $('#scene4 #clavier rect').each(function(this: Element) {
        for (let i = 0; i < 44; i++) {
          if (Math.random() < 0.04) {
            keyAnims.push({el: this, s: 4300 + i * 50, m: 4320 + i * 50, e: 4340 + i * 50});
          }
        }
      });

      window.scrollTo(0, 0);

      const {gsap} = await import('gsap');
      const {ScrollTrigger} = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const SCROLL = 9000;
      const at = (px: number) => px / SCROLL;
      const dur = (a: number, b: number) => (b - a) / SCROLL;

      gsap.set('#scene1', {top: '0%'});
      gsap.set(['#scene2', '#scene3', '#scene4', '#scene5'], {top: '100%'});
      gsap.set('#navbar-footer svg', {opacity: 0});
      gsap.set('#navbar-footer #move-color', {fill: 'rgb(52, 152, 219)'});
      gsap.set('#navbar-footer #fix-color', {fill: 'rgb(47, 117, 163)'});
      gsap.set('#navbar-footer #move-rect', {scaleX: 1});
      gsap.set('#scene1 #path1 path', {strokeDashoffset: 2000});
      gsap.set('#scene2 #path2 path', {strokeDashoffset: 6000});
      gsap.set('#scene3 #path3 path', {strokeDashoffset: 6000});
      gsap.set('#scene4 #path4 path', {strokeDashoffset: 6000});
      gsap.set('#scene5 #circle-work', {strokeDashoffset: 6000});

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: `+=${SCROLL}`,
          scrub: true
        }
      });

      // â”€â”€ SCENE 1 (exits 400â†’900) â”€â”€
      tl.to('#scene1', {top: '-100%', ease: 'none', duration: dur(400, 900)}, at(400));
      tl.to('#scene1 #inspired', {x: 100, y: 30, opacity: 0, ease: 'none', duration: dur(0, 100)}, at(0));
      tl.to('#scene1 #scroll-mouse', {x: 30, y: 30, opacity: 0, ease: 'none', duration: dur(0, 100)}, at(0));
      tl.fromTo('#scene1 #text #text-hello', {x: 300, y: -100}, {x: 0, y: 0, ease: 'none', duration: dur(0, 100)}, at(0));
      tl.fromTo('#scene1 #text #text-engineer', {y: -10, opacity: 0}, {y: 0, opacity: 1, ease: 'none', duration: dur(100, 200)}, at(100));
      tl.fromTo('#scene1 #text #text-developer', {y: -10, opacity: 0}, {y: 0, opacity: 1, ease: 'none', duration: dur(120, 170)}, at(120));
      tl.fromTo('#scene1 #calculator', {x: 300, y: 200, rotation: 30, opacity: 0}, {x: 0, y: 0, rotation: 0, opacity: 1, ease: 'none', duration: dur(100, 200)}, at(100));
      tl.fromTo('#scene1 #helmet', {x: -600, y: 100, rotation: -60, opacity: 0}, {x: 0, y: 0, rotation: 0, opacity: 1, ease: 'none', duration: dur(120, 240)}, at(120));
      tl.fromTo('#scene1 #phone', {x: -600, y: 100, rotation: -60, opacity: 0}, {x: 0, y: 0, rotation: 0, opacity: 1, ease: 'none', duration: dur(120, 240)}, at(120));
      tl.fromTo('#scene1 #map-construction', {x: -300, y: -500, rotation: -10, opacity: 0}, {x: 0, y: 0, rotation: 0, opacity: 1, ease: 'none', duration: dur(50, 150)}, at(50));
      tl.fromTo('#scene1 #paper-2', {x: 300, y: -500, rotation: 30, opacity: 0}, {x: 0, y: 0, rotation: 0, opacity: 1, ease: 'none', duration: dur(90, 160)}, at(90));
      tl.fromTo('#scene1 #pensil', {x: -300, y: -200, rotation: -30, opacity: 0}, {x: 0, y: 0, rotation: 0, opacity: 1, ease: 'none', duration: dur(80, 180)}, at(80));
      tl.fromTo('#scene1 #paper-1', {x: 400, y: -10, rotation: -60, opacity: 0}, {x: 0, y: 0, rotation: 0, opacity: 1, ease: 'none', duration: dur(120, 220)}, at(120));
      tl.to('#scene1 #path1 path', {strokeDashoffset: 0, ease: 'none', duration: dur(200, 700)}, at(200));

      // â”€â”€ SCENE 2 (enters 400â†’900, exits 1500â†’2500) â”€â”€
      tl.to('#scene2', {top: '0%', ease: 'none', duration: dur(400, 900)}, at(400));
      tl.to('#scene2', {top: '-100%', ease: 'none', duration: dur(1500, 2500)}, at(1500));
      tl.to('#scene2 #path2 path', {strokeDashoffset: 0, ease: 'none', duration: dur(580, 2680)}, at(580));
      tl.fromTo('#scene2 #estp', {x: -30, opacity: 0}, {x: 0, opacity: 1, ease: 'none', duration: dur(920, 950)}, at(920));
      tl.fromTo('#scene2 #tud', {y: -30, opacity: 0}, {y: 0, opacity: 1, ease: 'none', duration: dur(1020, 1050)}, at(1020));
      tl.fromTo('#scene2 #escp', {y: 30, opacity: 0}, {y: 0, opacity: 1, ease: 'none', duration: dur(1180, 1210)}, at(1180));

      // â”€â”€ SCENE 3 (enters 1500â†’2500, exits 4000â†’5000) â”€â”€
      tl.to('#scene3', {top: '0%', ease: 'none', duration: dur(1500, 2500)}, at(1500));
      tl.to('#scene3', {top: '-100%', ease: 'none', duration: dur(4000, 5000)}, at(4000));
      tl.to('#scene3 #path3 path', {strokeDashoffset: 0, ease: 'none', duration: dur(1720, 5680)}, at(1720));
      tl.fromTo('#scene3 #bulle', {x: -30, opacity: 0}, {x: 0, opacity: 1, ease: 'none', duration: dur(1990, 2030)}, at(1990));
      people.forEach((el, index) => {
        const s = 2230 + index * 5;
        tl.fromTo(el, {x: -10, y: 10, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: 'none', duration: dur(s, s + 8)}, at(s));
      });
      tl.fromTo('#scene3 #curtain', {y: 0, scaleY: 1}, {y: -30, scaleY: 0.3, ease: 'none', duration: dur(2290, 2350)}, at(2290));
      tl.fromTo('#scene3 #bim', {x: -50, y: 50, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: 'none', duration: dur(2690, 2740)}, at(2690));
      tl.fromTo('#scene3 #text-fleche', {y: 50, opacity: 0}, {y: 0, opacity: 1, ease: 'none', duration: dur(2800, 2860)}, at(2800));
      tl.fromTo('#scene3 #helmet-3', {y: 50, opacity: 0}, {y: 0, opacity: 1, ease: 'none', duration: dur(3300, 3350)}, at(3300));
      tl.fromTo('#scene3 #iot-helmet', {x: -50, y: 50, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: 'none', duration: dur(3400, 3450)}, at(3400));
      tl.fromTo('#scene3 #signal-helmet', {opacity: 0}, {opacity: 1, ease: 'none', duration: dur(3500, 3530)}, at(3500));
      tl.fromTo('#scene3 #roadware', {y: -50, opacity: 0}, {y: 0, opacity: 1, ease: 'none', duration: dur(3630, 3690)}, at(3630));
      [[3830, 3860, 0], [3860, 3890, 1], [3890, 3920, 0], [3920, 3960, 1],
       [3960, 3990, 0], [3990, 4020, 1], [4020, 4050, 0]].forEach(([s, e, op]) => {
        tl.to('#scene3 #warning', {opacity: op, ease: 'none', duration: dur(s, e)}, at(s));
      });

      // â”€â”€ SCENE 4 (enters 4000â†’5000, exits 6000â†’6800) â”€â”€
      tl.to('#scene4', {top: '0%', ease: 'none', duration: dur(4000, 5000)}, at(4000));
      tl.to('#scene4', {top: '-100%', ease: 'none', duration: dur(6000, 6800)}, at(6000));
      tl.to('#scene4 #path4 path', {strokeDashoffset: 0, ease: 'none', duration: dur(4342, 5680)}, at(4342));
      tl.fromTo('#scene4 #text-code-1', {x: -50, y: -50, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: 'none', duration: dur(4650, 4750)}, at(4650));
      tl.fromTo('#scene4 #text-love-code', {x: -50, y: -50, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: 'none', duration: dur(5650, 5700)}, at(5650));
      ([['#nodejs', 4950, 5000], ['#angular2', 5000, 5050], ['#d3js', 5050, 5100],
        ['#js-more-global', 5100, 5150], ['#python', 5150, 5200],
        ['#scrapy', 5200, 5250], ['#python-more-global', 5250, 5300]] as [string, number, number][])
        .forEach(([id, s, e]) => {
          tl.fromTo(`#scene4 ${id}`, {x: -30, y: 30, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: 'none', duration: dur(s, e)}, at(s));
        });
      const lights: [number, number][] = [
        [4300, 0.8], [4400, 0.2], [4500, 1], [4600, 0.3], [4700, 0.9], [4800, 0],
        [4900, 0.6], [5000, 0.3], [5100, 1], [5200, 0.5], [5300, 1], [5400, 0.1],
        [5500, 0.6], [5600, 0.2], [5700, 0.8], [5800, 0.3], [5900, 0.7], [6000, 0],
        [6100, 0.9], [6200, 0.1], [6300, 1], [6400, 0]
      ];
      for (let i = 0; i < lights.length - 1; i++) {
        const [s, op] = lights[i], [e] = lights[i + 1];
        tl.to('#scene4 #light-laptop', {opacity: op, ease: 'none', duration: dur(s, e)}, at(s));
      }
      keyAnims.forEach(({el, s, m, e}) => {
        tl.to(el, {fill: 'rgb(117, 120, 135)', ease: 'none', duration: dur(s, m)}, at(s));
        tl.to(el, {fill: 'rgb(211, 212, 221)', ease: 'none', duration: dur(m, e)}, at(m));
      });

      // â”€â”€ SCENE 5 (enters 6000â†’6800) â”€â”€
      tl.to('#scene5', {top: '0%', ease: 'none', duration: dur(6000, 6800)}, at(6000));
      tl.to('#scene5 #circle-work', {strokeDashoffset: 0, ease: 'none', duration: dur(7100, 7300)}, at(7100));
      tl.fromTo('#scene5 #success-7', {x: -5, y: 10, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: 'none', duration: dur(6800, 6850)}, at(6800));
      tl.fromTo('#scene5 #success-8', {x: -5, y: 10, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: 'none', duration: dur(6900, 6950)}, at(6900));
      tl.fromTo('#scene5 #success-9', {x: -5, y: 10, opacity: 0}, {x: 0, y: 0, opacity: 1, ease: 'none', duration: dur(7000, 7050)}, at(7000));
      tl.fromTo('#scene5 #arrow-work', {y: 30, opacity: 0}, {y: 0, opacity: 1, ease: 'none', duration: dur(6950, 7000)}, at(6950));
      tl.fromTo('#scene5 #hire', {y: 30, opacity: 0}, {y: 0, opacity: 1, ease: 'none', duration: dur(7100, 7150)}, at(7100));
      tl.fromTo('#scene5 #click-here-text', {y: 30, opacity: 0}, {y: 0, opacity: 1, ease: 'none', duration: dur(7150, 7200)}, at(7150));

      // â”€â”€ NAVBAR â”€â”€
      tl.to('#navbar-footer svg', {opacity: 1, ease: 'none', duration: dur(0, 120)}, at(0));
      const navScale: [number, number][] = [[0, 1], [400, 5.1], [1300, 10.6], [4000, 16.3], [5700, 23], [7000, 31]];
      for (let i = 0; i < navScale.length - 1; i++) {
        const [s, scaleX] = navScale[i], [e] = navScale[i + 1];
        tl.to('#navbar-footer #move-rect', {scaleX, ease: 'none', duration: dur(s, e)}, at(s));
      }
      tl.to('#navbar-footer #move-color', {fill: 'rgb(68, 198, 80)', ease: 'none', duration: dur(495, 500)}, at(495));
      tl.to('#navbar-footer #fix-color', {fill: 'rgb(62, 139, 62)', ease: 'none', duration: dur(495, 500)}, at(495));
      tl.to('#navbar-footer #move-color', {fill: 'rgb(231, 76, 60)', ease: 'none', duration: dur(4200, 4205)}, at(4200));
      tl.to('#navbar-footer #fix-color', {fill: 'rgb(176, 56, 43)', ease: 'none', duration: dur(4200, 4205)}, at(4200));

      ScrollTrigger.refresh();
      this.overlay.set(false);

      setTimeout(() => {
        $('#scene1 #scroll-cursor').attr({
          style: '-webkit-animation-name: mouse-movement; -webkit-animation-duration: 4s; animation-name: mouse-movement; animation-duration: 5s;'
        });
        $('#scene1 #scroll-bar').attr({
          style: 'fill:#3498DB; -webkit-animation-name: scroll-movement; -webkit-animation-duration: 4s; animation-name: scroll-movement; animation-duration: 5s;'
        });
      }, 2000);
    });
  }

  private appendSvg(svg: SVGElement, id: string) {
    const icon = svg.cloneNode(true) as SVGElement;
    this.renderer.appendChild(document.getElementById(id), icon);
  }

  private getResumeGlobal() {
    (this.frenchResume as Record<string, unknown>)['constructionExperience'] = [
      {company: 'Eiffage Travaux public', job: 'Assistant directeur de chantier et ingÃ©nieurs travaux', description: "Chantier principale : ouvrage d'infrastructure sous la voie Bastion. - Responsable de commandes auprÃ¨s de fournisseurs. - Gestion de la sÃ©curitÃ© sur le chantier et du suivi des Ã©quipes. - Responsable du DOE. - CrÃ©ation de plan d'exÃ©cutions. Chantier secondaire : AmÃ©nagement du mur d'une trÃ©mie de la SNCF. - Direction des exÃ©cutions et responsable de l'avancement. - Management de l'Ã©quipe (4 ouvriers, 1 conducteurs d'engins). - CrÃ©ation de procÃ©dures de construction. - Responsable de la communication avec la SNCF.", link: 'http://www.eiffageinfrastructures.com/', date: '2014', duration: '4 mois', flag: 'fr'},
      {company: 'Heinrich Walter Bau', job: 'Compagnon et assistant conducteur de travaux', description: 'Chantier BÃ¢timent neuf pour M.A.N : - IntÃ©gration Ã  une Ã©quipe de compagnon. - Responsable sÃ©curitÃ©.', link: 'http://www.heinrich-walter.de/home.html', date: '2013', duration: '3 mois', flag: 'de'}
    ];
    (this.frenchResume as Record<string, unknown>)['otherExperience'] = [
      {company: 'Akur8', job: 'Project engineer / First product manager', description: "Build the product department as the first product manager:\nâ€¢ Understand, map and prioritize customer and user needs as Akur8 expanded to new markets.\nâ€¢ Implement product management best practices as Akur8 expanded to 100 employees and 30 engineers.", duration: '4 years', flag: 'fr'},
      {company: 'La FonciÃ¨reNumÃ©rique', job: 'Lead dev / IngÃ©nieur projet', description: "Premier dÃ©veloppeur de l'company, nous avons dÃ©veloppÃ© une plateforme de plusieurs applications pour du big data dans l'immobilier (gestion des anomalies, SSO, data visualization...). Notre Ã©quipe de dÃ©veloppement a atteint jusqu'Ã  6 developpeurs, encadrÃ© par les methodes agiles (SCRUM). Les technologies utilisÃ©es sont les suivantes: Spring Boot, Kafka, Angular, Mongo, CirclCi, Rancher, Docker", duration: '2 mois', flag: 'fr'},
      {company: 'Multiples projets', job: 'dans la construction', description: '- Casque connectÃ© pour rÃ©duire les accidents sur les chantiers. - La disposition des fichiers IFC Ã  la domotique pour amÃ©liorer la maison intelligente. - Une application de suivis de l\'IOT sur les routes (Aximum/Colas).', date: '2016-2017', duration: '8 mois', flag: 'fr'},
      {company: 'Merci Public', job: 'Co-fondateur et CTO', description: "MERCI PUBLIC offre au public la possibilitÃ© de faire venir l'artiste de son choix dans sa ville, par un systÃ¨me de prÃ©-rÃ©servation qui fonctionne comme un appel. - Responsable technique et technologique - Management de 4 stagiaires - RÃ©alisation de site web (angularJs/NodeJs)", link: 'http://www.mercipublic.com', date: '2016', duration: '8 mois', flag: 'fr'},
      {company: 'Diverses missions', description: '- RÃ©alisation de scripts de rÃ©coltes de donnÃ©es automatisÃ©es sur internet. - DÃ©marchage tÃ©lÃ©phonique', link: 'http://www.mercipublic.com', date: '2016-2013', flag: 'fr'}
    ];
    (this.frenchResume as Record<string, unknown>)['formation'] = [
      {company: 'ESCP EUROPE', description: 'MastÃ¨re SpÃ©cialisÃ© Innover et Entreprendre (MSIE)', date: '2015-2016', flag: 'fr'},
      {company: 'Technische UniversitÃ¢t Dresden', description: "DiplÃ´me d'ingÃ©nieur allemand en construction de la TUD avec une spÃ©cialisation en management de la construction. ThÃ¨se de fin d'Ã©tude : Armature en fibre de carbone - utilisation et systÃ¨me.", date: '2014-2015', flag: 'de'},
      {company: 'ESTP Paris', description: "DiplÃ´me d'ingÃ©nieur de l'ESTP spÃ©cialisÃ© en Travaux public.", date: '2013-2015', flag: 'fr'}
    ];
    (this.frenchResume as Record<string, unknown>)['skill'] = {english: 'parlÃ© et Ã©crit', german: 'parlÃ© et Ã©crit', french: 'Langue maternelle', software: 'Microsoft Office, Autocad, Ms-Project', design: 'Photoshop, Illustrator', computer: 'JavaScript, Python'};

    (this.englishResume as Record<string, unknown>)['constructionExperience'] = [
      {company: 'Eiffage Travaux public', job: 'Site Engineer', description: '- Organising and supervising material and human resources - Organising the site, defining the schedule - Preparing construction and control plans - Liaising with clients, the local authority and their representatives and subcontractors', link: 'http://www.eiffageinfrastructures.com/', date: '2014', duration: '4 Months', flag: 'fr'},
      {company: 'Heinrich Walter Bau', job: 'Site Engineer assistant', description: '- Day-to-day management of the site', link: 'http://www.heinrich-walter.de/home.html', date: '2013', duration: '3 Months', flag: 'de'}
    ];
    (this.englishResume as Record<string, unknown>)['otherExperience'] = [
      {company: 'Akur8', job: 'Project engineer / First product manager', description: "Build the product department as the first product manager:\nâ€¢ Understand, map and prioritize customer and user needs as Akur8 expanded to new markets.\nâ€¢ Implement product management best practices as Akur8 expanded to 100 employees and 30 engineers.", duration: '4 years', flag: 'fr'},
      {company: 'La FonciÃ¨reNumÃ©rique', job: 'Lead dev / Project Engineer', description: 'First developer of my company, we develop a big data platform for real-estate with multiples applications (anomaly management, SSO, data vizualization...). The developer team (max 6 peoples) uses the SCRUM method. The technical stack used: Spring Boot, Kafka, Angular, Mongo, CirclCi, Rancher, Docker', duration: '2 years', flag: 'fr'},
      {company: 'Different projects', job: 'about construction', description: '- Smart security hat - Application for the security on construction sites - IOT', date: '2016-2017', duration: '8 Months', flag: 'fr'},
      {company: 'Merci Public', job: 'Cofunder and CTO', description: '- Management of the technological part - Programmation of the fullstack website (angularJs/NodeJs)', link: 'http://www.mercipublic.com', date: '2016', duration: '8 Months', flag: 'fr'},
      {company: 'Other jobs', description: '- Scraping - Phone-Marketing', link: 'http://www.mercipublic.com', date: '2016-2013', flag: 'fr'}
    ];
    (this.englishResume as Record<string, unknown>)['formation'] = [
      {company: 'ESCP EUROPE', description: 'Executive master in Innovation und Entrepreneurship', date: '2015-2016', flag: 'fr'},
      {company: 'Technische UniversitÃ¢t Dresden', description: "German master's degree in construction Processings.", date: '2014-2015', flag: 'de'},
      {company: 'Ecole SpÃ©cial des Travaux Publics ', description: "French master's degree in civil engineering", date: '2013-2015', flag: 'fr'}
    ];
    (this.englishResume as Record<string, unknown>)['skill'] = {english: 'speak, read and write', german: 'speak, read and write', french: 'native language', software: 'Microsoft Office, Autocad, Ms-Project', design: 'Photoshop, Illustrator', computer: 'JavaScript, Python'};

    (this.germanResume as Record<string, unknown>)['constructionExperience'] = [
      {company: 'Eiffage Travaux public', job: 'Assistent des Bauleiters und der Ingenieuren', description: 'Hauptbaustelle, Infrastrukturprojekte â€“ Ãœberbauungen - Beschaffung von Materialien - GewÃ¤hrleistung der Sicherheit und der Kontrolle des Personals - Bearbeitung der Enddokumentation - Erstellung von DurchfÃ¼hrungsplÃ¤nen Nebenbaustelle, Ausdehnung von WÃ¤nden - Leitung von der DurchfÃ¼hrung der Baustelle - Manager von vier Arbeitern - Erstellung von Bau-DurchfÃ¼hrungsplÃ¤nen - Kommunikation mit der SNCF', link: 'http://www.eiffageinfrastructures.com/', date: '2014', duration: '4 Monate', flag: 'fr'},
      {company: 'Heinrich Walter Bau', job: 'Assistent des Bauleiters', description: 'Baustelle fÃ¼r neue GebÃ¤ude fÃ¼r M.A.N: - Assistent des Bauleiters - Sicherheit', link: 'http://www.heinrich-walter.de/home.html', date: '2013', duration: '3 Monate', flag: 'de'}
    ];
    (this.germanResume as Record<string, unknown>)['otherExperience'] = [
      {company: 'Akur8', job: 'Project engineer / First product manager', description: "Build the product department as the first product manager:\nâ€¢ Understand, map and prioritize customer and user needs as Akur8 expanded to new markets.\nâ€¢ Implement product management best practices as Akur8 expanded to 100 employees and 30 engineers.", duration: '4 years', flag: 'fr'},
      {company: 'La FonciÃ¨reNumÃ©rique', job: 'Lead dev / Projekt Ingenieur', description: 'First developer of my company, we develop a big data platform for real-estate with multiples applications (anomaly management, SSO, data vizualization...). The developer team (max 6 peoples) uses the SCRUM method. The technical stack used: Spring Boot, Kafka, Angular, Mongo, CirclCi, Rancher, Docker', duration: '18 Jahre', flag: 'fr'},
      {company: 'Verschiedene Startup-Projekte', job: 'im Bereich Bauwesen', description: '- Intelligente Kopfschutzhelme - Applikation fÃ¼r die Gesundheit von Bau- IOT', date: '2016-2017', duration: '8 Monate', flag: 'fr'},
      {company: 'Merci Public', job: 'Co-fondateur et CTO', description: '- Technischer und technologischer Manager - Betreuer von 4 Praktikanten - Gestaltung der Website (angularJs/NodeJs)', link: 'http://www.mercipublic.com', date: '2016', duration: '8 Monate', flag: 'fr'},
      {company: 'Verschiedene Arbeiten', description: '- Scraping - Telefon-Marketing', link: 'http://www.mercipublic.com', date: '2016-2013', flag: 'fr'}
    ];
    (this.germanResume as Record<string, unknown>)['formation'] = [
      {company: 'ESCP EUROPE', description: 'Spezialisierter Master in Innovation und Unternehmertum', date: '2015-2016', flag: 'fr'},
      {company: 'Technische UniversitÃ¢t Dresden', description: 'Ingenieurdiplom â€“ Bauwesen. Diplomarbeit: Carbonbewehrung â€“ Systeme und EinsatzmÃ¶glichkeiten (Note: 2,3)', date: '2014-2015', flag: 'de'},
      {company: 'Ecole SpÃ©cial des Travaux Publics ', description: 'Ingenieurdiplom â€“ Bauwesen mit der Vertiefung Hochbau', date: '2013-2015', flag: 'fr'}
    ];
    (this.germanResume as Record<string, unknown>)['skill'] = {english: 'Gute Kenntnisse', german: 'Gute Kenntnisse', french: 'Muttersprache', software: 'Microsoft Office, Autocad, Ms-Project', design: 'Photoshop, Illustrator', computer: 'JavaScript, Python'};
  }
}
