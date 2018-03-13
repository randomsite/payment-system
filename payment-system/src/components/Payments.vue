<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="top-line">
          <img src="../assets/img/logo.png" alt="logo">
          <button @click="addProject()">Add New</button>
        </div>
      </div>
    </header>

    <div class="content">
      <div class="container">

        <div class="table">

          <div class="table-header">
            <div class="table-header-info">
              <div class="table-length" id="table-length">
                <label>Show <select name="table-length" class="form-control">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select> entries</label>
                <span>Show completed</span>
              </div>
              <div id="table-search" class="table-search">
                <input type="search" class="form-control" placeholder="Search">
              </div>
            </div>

            <div class="table-row">
              <div class="table-cell table-cell-date">Date start</div>
              <div class="table-cell table-cell-date">Date end</div>
              <div class="table-cell table-cell-project">Project</div>
              <div class="table-cell table-cell-status">Work</div>
              <div class="table-cell table-cell-status">Done</div>
              <div class="table-cell table-cell-status">Pay</div>
              <div class="table-cell table-cell-price">Price</div>
              <div class="table-cell table-cell-actions">Actions</div>
            </div>
          </div>

          <div class="table-content">

            <div class="table-row" v-for="project of projects" :key="project['.key']" v-if="project.is_edit">
              <div class="table-cell table-cell-date"><input type="text" class="date" v-model="project.date_start">
              </div>
              <div class="table-cell table-cell-date"><input type="text" class="date" v-model="project.date_end"></div>
              <div class="table-cell table-cell-project"><input type="text" v-model="project.site"></div>
              <div class="table-cell table-cell-status">
                <i @click="switchStatus(project, 'is_work')" :class="{'fas': project.is_work, 'far': !project.is_work }"
                   class="fa-star tc-icon tc-icon-amber"></i>
              </div>
              <div class="table-cell table-cell-status">
                <i @click="switchStatus(project, 'is_done')" :class="{'fas': project.is_done, 'far': !project.is_done }"
                   class="fa-star tc-icon tc-icon-amber"></i>
              </div>
              <div class="table-cell table-cell-status">
                <i @click="switchStatus(project, 'is_pay')" :class="{'fas': project.is_pay, 'far': !project.is_pay }"
                   class="fa-star tc-icon tc-icon-amber"></i>
              </div>
              <div class="table-cell table-cell-price"><input type="text" v-model="project.price"></div>
              <div class="table-cell table-cell-actions">
                <i @click="saveProject(project, true)" class="fas fa-check tc-icon tc-icon-blue"></i>
                <i @click="removeProject(project)" class="fas fa-trash-alt tc-icon tc-icon-red"></i>
              </div>
            </div>

            <div class="table-row" :class="{'completed': project.completed}" v-else>
              <div class="table-cell table-cell-date">{{project.date_start}}</div>
              <div class="table-cell table-cell-date">{{project.date_end}}</div>
              <div class="table-cell table-cell-project">{{project.site}}</div>
              <div class="table-cell table-cell-status">
                <i @click="switchStatus(project, 'is_work')" :class="{'fas': project.is_work, 'far': !project.is_work }"
                   class="fa-star tc-icon tc-icon-amber"></i>
              </div>
              <div class="table-cell table-cell-status">
                <i @click="switchStatus(project, 'is_done')" :class="{'fas': project.is_done, 'far': !project.is_done }"
                   class="fa-star tc-icon tc-icon-amber"></i>
              </div>
              <div class="table-cell table-cell-status">
                <i @click="switchStatus(project, 'is_pay')" :class="{'fas': project.is_pay, 'far': !project.is_pay }"
                   class="fa-star tc-icon tc-icon-amber"></i>
              </div>
              <div class="table-cell table-cell-price">{{project.price}} UAH</div>
              <div class="table-cell table-cell-actions">
                <i @click="editProject(project)" class="fas fa-edit tc-icon tc-icon-blue"></i>
                <i @click="removeProject(project)" class="fas fa-trash-alt tc-icon tc-icon-red"></i>
              </div>
            </div>

          </div>

          <div class="table-footer">
            <div class="table-footer-info" id="table-footer-info">Total {{projects.length}} projects</div>
            <!--<div class="table-footer-paginate" id="table1_paginate">-->
            <!--<ul class="pagination">-->
            <!--<li class="paginate_button page-item previous disabled" id="table1_previous"><a href="#" class="page-link">Previous</a></li>-->
            <!--<li class="paginate_button page-item active"><a href="#" class="page-link">1</a></li>-->
            <!--<li class="paginate_button page-item "><a href="#" class="page-link">2</a></li>-->
            <!--<li class="paginate_button page-item "><a href="#" class="page-link">3</a></li>-->
            <!--<li class="paginate_button page-item "><a href="#" class="page-link">4</a></li>-->
            <!--<li class="paginate_button page-item "><a href="#" class="page-link">5</a></li>-->
            <!--<li class="paginate_button page-item "><a href="#" class="page-link">6</a></li>-->
            <!--<li class="paginate_button page-item next" id="table1_next"><a href="#" class="page-link">Next</a></li>-->
            <!--</ul>-->
            <!--</div>-->
          </div>

        </div>

      </div>
    </div>

    <footer class="footer">
      <div class="copy">2018 &copy; RNDM</div>
    </footer>
  </div>
</template>

<script>
    import firebase from 'firebase'
    import VueFire from 'vuefire'
    import {db} from '../main'

    export default {
        name: 'Payments',
        data() {
            return {
                projects: {}
            }
        },
        firebase: {
            projects: db
        },
        methods: {
            addProject: function (project) {
                db.push({
                    'completed': false,
                    'date_start': '',
                    'date_end': '',
                    'site': 'Test',
                    'is_work': false,
                    'is_done': false,
                    'is_pay': false,
                    'price': 0,
                    'is_edit': true
                });
            },
            saveProject: function (project, autosave) {
                db.child(project['.key']).update({
                    'date_start': project.date_start,
                    'date_end': project.date_end,
                    'site': project.site,
                    'is_work': project.is_work,
                    'is_done': project.is_done,
                    'is_pay': project.is_pay,
                    'price': project.price,
                    'is_edit': project.is_edit,
                });

                if (autosave) {
                    db.child(project['.key']).update({is_edit: false});
                }

                if (project.is_work && project.is_done && project.is_pay) {
                    db.child(project['.key']).update({completed: true});
                } else {
                    db.child(project['.key']).update({completed: false});
                }
            },
            editProject: function (project) {
                db.child(project['.key']).update({is_edit: true});
            },
            removeProject: function (project) {
                db.child(project['.key']).remove()
            },
            switchStatus: function (project, field_key) {
                if (event.target.classList.contains('fas')) {
                    project[field_key] = false;
                } else {
                    project[field_key] = true;
                }
                this.saveProject(project, false);
            }

        }
    }
</script>
<style>
  html,
  body {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    background: #eee;
    color: #404044;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
  }

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .container {
    width: 1140px;
    margin: 0 auto;
  }

  #app {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .header {
    background-color: #252830;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, .04);
    position: relative;
    z-index: 1;
  }

  .top-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }

  .content {
    padding: 20px 0;
    flex-grow: 1;
  }

  .table {
    background-color: #ffffff;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, .04);
  }

  .table-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #dedede;
  }

  .table-row.completed .table-cell {
    opacity: 0.25;
  }

  .table-header-info {
    padding: 20px;
  }

  .table-header .table-row {
    border-bottom: 2px solid #dee2e6;
  }

  .table-cell {
    padding: 15px 20px;
  }

  .table-cell input {
    padding: 0;
    width: 100%;
    border: 0;
    border-bottom: 1px solid #dedede;
    color: #404044;
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
  }

  .table-header .table-cell {
    padding: 20px;
    font-weight: 700;
  }

  .table-content .table-cell {
    font-size: 13px;
  }

  .table-content .table-cell .tc-icon {
    font-size: 16px;
  }

  .table-footer {
    padding: 20px;
    background-color: #f7f7f7
  }

  .tc-icon {
    cursor: pointer;
  }

  .tc-icon-amber {
    color: #ffc107;
  }

  .tc-icon-amber:hover {
    color: #ffa000;
  }

  .tc-icon-blue {
    margin-left: 10px;
    color: #448AFF;
  }

  .tc-icon-blue:hover {
    color: #1976D2;
  }

  .tc-icon-red {
    margin-left: 10px;
    color: #FF5252;
  }

  .tc-icon-red:hover {
    color: #d32f2f;
  }

  .table-cell-date {
    width: 140px;
  }

  .table-cell-project {
    width: 320px;
  }

  .table-cell-status {
    width: 100px;
  }

  .table-cell-price {
    width: 140px;
  }

  .table-cell-actions {
    width: 100px;
    text-align: right;
  }

  .footer {
    background-color: #252830;
    text-align: center;
    padding: 20px 0;
  }

  .copy {
    color: #ffffff;
    font-size: 14px;
  }

  button {
    display: block;
    margin: 0;
    padding: 0 15px;
    background-color: #2856b6;
    color: #fff;
    font-weight: 500;
    line-height: 40px;
    text-transform: uppercase;
    text-decoration: none;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .23), 0 3px 10px rgba(0, 0, 0, .16);
    border: 0;
    border-radius: 2px;
    cursor: pointer;
    transition: box-shadow .28s cubic-bezier(.4, 0, .2, 1);
    outline: 0 !important;
  }

  button:hover {
    background-color: #234ca1;
    color: #fff;
    text-decoration: none;
  }

  .form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #fff;
    background-color: #434857;
    background-clip: padding-box;
    border: 1px solid #434857;
    border-radius: 0.25rem;
    -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

</style>