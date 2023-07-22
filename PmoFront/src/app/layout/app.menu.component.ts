import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService,
        public userService: UserService) { }

    ngOnInit() {
        if (this.userService.roleMatch(['Admin']))  {
            this.model = [
                {
                    label: 'Home',
                    items: [
                        {
                            label: 'Admin dashboard',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/'],
                        },
                        {
                            label: 'Project management', icon: 'pi pi-fw pi-briefcase',
                            items: [
                                {
                                    // label: 'Add project', icon: 'pi pi-fw pi-bookmark',
                                    // routerLink: ['/dashboard/adminPages/addProject'],
                                    label: 'Projects', icon: 'pi pi-fw pi-bookmark',
                                    routerLink: ['/dashboard/PmoPages/projects'],
                                },
                                {
                                    // label: 'consult users', icon: 'pi pi-fw pi-server',
                                    // routerLink: ['/dashboard/adminPages/userswprojects'],

                                },

                            ]
                        },
                        {
                            label: 'Accounts management', icon: 'pi pi-fw pi-users',
                            items: [
                                {
                                    label: 'Users ', icon: 'pi pi-fw pi-user-plus',
                                    routerLink: ['/dashboard/adminPages/addUser'],
                                },
                                {
                                    label: 'roles', icon: 'pi pi-fw pi-user',
                                    routerLink: ['/dashboard/adminPages/addRole'],
                                },
                                {

                                },


                            ]
                        }
                    ]
                },

            ];
        } else if (this.userService.roleMatch(['pmo'])) {

            this.model = [
                {
                    label: 'Home',
                    items: [
                        {
                            label: 'Pmo dashboard',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/'],
                        },
                        {
                            label: 'Project management', icon: 'pi pi-fw pi-briefcase',
                            items: [
                                // {
                                //     label: 'Add project', icon: 'pi pi-fw pi-bookmark',
                                //     routerLink: ['/dashboard/adminPages/addProject'],
                                // },
                                {
                                    label: 'Projects', icon: 'pi pi-fw pi-bookmark',
                                    routerLink: ['/dashboard/PmoPages/projects'],
                                },


                            ]
                        },

                    ]

                },
            ]
        } else if (this.userService.roleMatch(['pm'])) {

          this.model = [
              {
                  label: 'Home',
                  items: [
                      {
                          label: 'Pm dashboard',
                          icon: 'pi pi-fw pi-home',
                          routerLink: ['/'],
                      },
                      {
                          label: 'Project management', icon: 'pi pi-fw pi-briefcase',
                          items: [
                              // {
                              //     label: 'Add project', icon: 'pi pi-fw pi-bookmark',
                              //     routerLink: ['/dashboard/adminPages/addProject'],
                              // },
                              {
                                  label: 'Projects', icon: 'pi pi-fw pi-bookmark',
                                  routerLink: ['/dashboard/PmPages/projects'],
                              },


                          ]
                      },

                  ]

              },
          ]
        } else {
          this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Pm dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                    {
                        label: 'Project management', icon: 'pi pi-fw pi-briefcase',
                        items: [
                            // {
                            //     label: 'Add project', icon: 'pi pi-fw pi-bookmark',
                            //     routerLink: ['/dashboard/adminPages/addProject'],
                            // },
                            {
                                label: 'Tasks', icon: 'pi pi-fw pi-bookmark',
                                routerLink: ['/dashboard/ConsultantPages/tasks'],
                            },


                        ]
                    },

                ]

            },
        ]

      }
    }
}


/*
this.model = [
                {
                    label: 'Home',
                    items: [
                        {
                            label: 'Admin dashboard',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/'],
                        },
                        {
                            label: 'Project management', icon: 'pi pi-fw pi-briefcase',
                            items: [
                                {
                                    label: 'Add project', icon: 'pi pi-fw pi-bookmark',
                                    routerLink: ['/dashboard/adminPages/addProject'],
                                },
                                {
                                    label: 'consult users', icon: 'pi pi-fw pi-server',
                                    routerLink: ['/dashboard/adminPages/userswprojects'],
                                },

                            ]
                        },
                        {
                            label: 'Accounts management', icon: 'pi pi-fw pi-users',
                            items: [
                                {
                                    label: 'Users ', icon: 'pi pi-fw pi-user-plus',
                                    routerLink: ['/dashboard/adminPages/addUser'],
                                },
                                {
                                    label: 'roles', icon: 'pi pi-fw pi-user',
                                    routerLink: ['/dashboard/adminPages/addRole'],
                                },
                                {
                                    label: 'Projects', icon: 'pi pi-fw pi-bookmark',
                                    routerLink: ['/dashboard/PmoPages/projects'],
                                },


                            ]
                        }
                    ]
                },

            ];

*/
