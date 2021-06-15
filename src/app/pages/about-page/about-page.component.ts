import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {Camera, Light, Object3D, Renderer, Scene, WebGLRenderer} from 'three';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('days') daysElement: ElementRef | undefined;
  @ViewChild('engines') enginesElement: ElementRef | undefined;
  @ViewChild('clients') clientsElement: ElementRef | undefined;
  @ViewChild('canvas') canvas: ElementRef | undefined;
  scene: Scene|undefined;
  renderer: WebGLRenderer|undefined;
  camera: Camera|undefined;
  engine: Object3D|undefined;
  animationStarted = false;

  constructor() {
    setTimeout(() => {
      this.loadModel();
    }, 1000);
  }

  ngOnInit(): void {
    document.body.scroll(0, 0);
    document.body.addEventListener('scroll', this.handleScroll);
    try {
      const vid = document.getElementById('vid'); // @ts-ignore
      vid.muted = true; vid.play();
    } catch (ignore) { }
  }

  ngOnDestroy(): void {
    document.body.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if ( this.engine && this.canvas && this.camera) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      const offset = rect.top + rect.height / 2;
      this.engine.rotation.z = Math.PI / 1.7 - offset / window.innerHeight * Math.PI / 1.6;
      this.camera.position.y = 0.1 + (offset - window.innerHeight / 10) / window.innerHeight * 3;
      this.camera.lookAt(0, 0, 0);
      if (this.scene) { // @ts-ignore
        this.renderer.render(this.scene, this.camera);
      }
    }
    if (this.daysElement) { // @ts-ignore
      const offset = this.daysElement.nativeElement.getBoundingClientRect().top;
      if (offset < window.innerHeight && !this.animationStarted) {
        this.animationStarted = true;
        this.daysElement.nativeElement.classList.add('animated');
        this.enginesElement?.nativeElement.classList.add('animated');
        this.clientsElement?.nativeElement.classList.add('animated');
        this.animateNumber(
          this.daysElement.nativeElement,
          0, 2272, 3000
        );
        this.animateNumber(
          this.enginesElement?.nativeElement,
          0, 5472, 4000
        );
        this.animateNumber(
          this.clientsElement?.nativeElement,
          0, 272, 5000
        );
      }
    }
  }

  ngAfterViewInit(): void {
    this.setUpCanvas();
  }

  loadModel(): void {
    const loader = new GLTFLoader();
    loader.load('/assets/model/scene.gltf', gltf => {
      gltf.scene.traverse( node => {
        if (node.type === 'Mesh') {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      this.engine = gltf.scene.children[0];
      if (this.scene) {
        this.scene.add( this.engine );
        this.handleScroll();
      }
    });
  }

  async setUpCanvas(): Promise<void> {
    if (this.canvas) {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xfbfcff);
      const lightTop = new THREE.AmbientLight(0x404040, 21);
      const light1 = this.setUpLight(50, 0.5, 3, 0.6);
      const light2 = this.setUpLight(0, 85, 50, 4.5);
      this.scene.add(light1); this.scene.add(light2);
      this.scene.add(lightTop);
      this.camera = new THREE.PerspectiveCamera(40,
        this.canvas.nativeElement.offsetWidth /
        this.canvas.nativeElement.offsetHeight);
      this.camera.position.set(4, 0.1, 1);
      this.camera.lookAt(0, 0, 0);
      this.renderer = new THREE.WebGLRenderer({
        antialias: true, // @ts-ignore
        canvas: this.canvas.nativeElement,
      });
      this.renderer.setSize(this.canvas.nativeElement.offsetWidth,
        this.canvas.nativeElement.offsetHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = window.innerWidth > 600 ?
        THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
      this.renderer.render(this.scene, this.camera);

      const geometry = new THREE.PlaneGeometry(10, 10, 2, 2);
      const material = new THREE.MeshStandardMaterial( {
        color: 0x3a3a3a, side: THREE.DoubleSide, roughness: 1, metalness: 0.5
      });
      const plane = new THREE.Mesh( geometry, material );
      plane.rotateX(Math.PI / 2);
      plane.position.set(0, -0.8, 0);
      plane.receiveShadow = true;
      this.scene.add( plane );
      if (this.engine) {
        this.scene.add(this.engine);
        this.handleScroll();
      }
    }
  }

  setUpLight(x: number, y: number, z: number, power: number): Light {
    const light = new THREE.DirectionalLight( 0xffeedd, power);
    light.position.set(x, y, z);
    light.lookAt(0, 0, 0);
    light.castShadow = true;
    light.shadow.mapSize.width = 512; // default 512
    light.shadow.mapSize.height = 512; // default 512
    return light;
  }

  animateNumber(element: Element, start: number, end: number, duration: number): void {
    let startTimestamp = 0;
    const step = (timestamp: number) => {
      if (startTimestamp === 0) { startTimestamp = timestamp; }
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.innerHTML = '' + Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

}
