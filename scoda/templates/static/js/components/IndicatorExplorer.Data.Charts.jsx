import React, { PureComponent } from 'react';
import '../../style/google-menu.css'

import $ from 'jquery';
import {Canvg} from 'canvg';

export default class IndicatorExplorerDataChart extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            containerWidth: '100%',
            containerHeight: '450px'
        }

        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();

        if (this.props.data.length !== 0) {
            this.loadGoogleVizApi(this.props.data, this.props.filterYear, '100%', '100%');
        }

    }

    componentDidUpdate(prevProps) {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();

        if (
          JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data) ||
          this.props.filterYear !== prevProps.filterYear ||
          (this.props.selectedFilters !== prevProps.selectedFilters && this.props.selectedFilters.length !== 0)
        ) {
            this.loadGoogleVizApi(this.props.data, this.props.filterYear, '100%', '100%');
        }


    }

    componentWillUnmount() {
        // Cleanup event listener to avoid memory leaks
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {

        var element = document.getElementById('chart');
        var positionInfo = element.getBoundingClientRect();
        var height = positionInfo.height;
        var width = positionInfo.width;

        var elementT = document.getElementById('tableD');
        var positionInfoT = elementT.getBoundingClientRect();
        var heightT = positionInfoT.height;
        var widthT = positionInfoT.width;

        let windowWidth = document.body.clientWidth;
        let windowHeight = document.body.clientHeight;

        if (windowWidth <= 768) {
            windowWidth = width;
            windowHeight = '225px';
        }
        else {
            widthT = '96%';
            windowWidth = '100%';
            windowHeight = '450px';
        }

        document.getElementById('chart').style.height = windowHeight;
        document.getElementById('chart').style.width = windowWidth;

        /*if(this.props.data.length !== 0) {
            this.loadGoogleVizApi(this.props.data,this.props.filterYear,windowWidth,windowHeight);
        }*/
    }

    loadGoogleVizApi(resultSet, selectedYear, winWidth, winHeight) {
        const { maxSelection, onSelectionChange, onSelectionFilters, selectedFilters } = this.props;

        var options = {
            dataType: "script",
            cache: true,
            url: "https://www.google.com/jsapi",
        };

        $.ajax(options).done(function () {
            google.load("visualization", "1.1", {
                packages: ['controls', 'bar', 'corechart', 'geochart', 'line'],
                callback: function () {
                    document.getElementById('chartPng').value = '';

                    var dataSet = resultSet.table;

                    var options = {};

                    let rows = [];
                    let rowHeader = [];
                    for (let i = 0; i < dataSet[0].length; i++) {
                        rowHeader.push(dataSet[0][i]);
                    }

                    rows.push(rowHeader);

                    for (let j = 1; j < dataSet.length; j++) {
                        let rowItem = dataSet[j];
                        let row = [];
                        if (rowItem[1].toString() === selectedYear) {
                            for (let k = 0; k < rowItem.length; k++) {
                                row.push(rowItem[k]);
                            }
                            rows.push(row);
                        }
                    }

                    if (onSelectionFilters) {
                        onSelectionFilters({
                            selectedFilters: selectedFilters.length > 0 ? selectedFilters : resultSet.cities.slice(0, 10),
                        });
                    }

                    const getNextTickValue = (maxValue) => {
                        if (maxValue <= 0) return 1; // Fallback for edge cases with non-positive numbers

                        const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue))); // Get the order of magnitude
                        const baseMultiplier = (maxValue / magnitude) + .1; // Get the "leading part" (e.g., 1.129941 for 11299410)

                        // Round up to the next closest logical clean number
                        let nextTick
                       if ( baseMultiplier <= 1.999999999) {
                            nextTick = baseMultiplier * magnitude;
                        } else {
                            nextTick = Math.ceil(baseMultiplier) * magnitude;
                        }

                        return nextTick;

                    };

                    const setMinBasedOnMax = (maxValue) => {
                        // Handle edge cases where maxValue <= 0
                        if (maxValue <= 0) return -0.006;

                        // Calculate the magnitude of the max value
                        const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue))); // e.g., 10, 100, 1000...

                        let minValue
                        // Define the min value dynamically based on the max value
                        if (magnitude === 1) {
                            minValue =  -0.006 * magnitude
                        } else if (magnitude >= 10000000) {
                            minValue =  -0.006 * magnitude
                        } else {
                            minValue =  -0.06 * magnitude // Example scaling (0.06 for 1, 0.6 for 10)
                        }


                        return minValue; // The lower limit suitable for the given max value
                    };

                    const findMaxInRange = (resultSet) => {
                        // Safeguard to ensure the resultSet structure exists
                        if (!resultSet || !Array.isArray(resultSet.table)) {
                            throw new Error('resultSet.table is not valid.');
                        }

                        let max = -Infinity; // Start with the smallest possible number

                        // Iterate over rows
                        const data = resultSet.table.slice(1).filter((row) => selectedFilters.includes(row[0]));
                        data.forEach((row) => {
                            // Check if row[2] is a valid number
                            if (row[2] !== undefined && !isNaN(row[2])) {
                                max = Math.max(max, Number(row[2])); // Convert to number for safety
                            }
                        });

                        return max === 0 ? -Infinity : getNextTickValue(max); // Return null if no valid numbers are found
                    };

                    const findMinInRange = (resultSet) => {
                        // Safeguard to ensure the resultSet structure exists
                        if (!resultSet || !Array.isArray(resultSet.table)) {
                            throw new Error('resultSet.table is not valid.');
                        }

                        let max = -Infinity; // Start with the smallest possible number

                        // Extract rows matching the filters
                        const data = resultSet.table.slice(1).filter((row) => selectedFilters.includes(row[0]));

                        // Calculate the max value from the valid rows
                        data.forEach((row) => {
                            if (row[2] !== undefined && !isNaN(row[2])) {
                                max = Math.max(max, Number(row[2]));
                            }
                        });

                        return max === -Infinity ? 0 : setMinBasedOnMax(max); // Return 0 if no valid max value is found
                    };

                    if (resultSet.plot_type === 2) {
                        $('#categorySelector2').show();
                        $('#cat-spacer').show();

                        // Define bar chart options
                        options = {
                            title: resultSet.table[0][2] || 'Default Graph Title', // Main chart title
                            chartType: 'Bar',
                            dataTable: rows,
                            containerId: 'chart',
                            options: {
                                chart: {
                                    title: resultSet.table[0][2] || 'Default Graph Title',
                                },
                                title: resultSet.table[0][2] || 'Default Graph Title', // Main chart title
                                stacked: true, // Enable stacking
                                bars: 'vertical', // Vertical bar chart
                                axes: {
                                    x: {
                                        0: {
                                            side: 'bottom',
                                            label: resultSet.table[0][0] || 'Default X-Axis Label',
                                            slantedText: true,
                                            slantedTextAngle: 45
                                        } // Top x-axis.
                                    },
                                    y: {
                                        0: {
                                            side: 'left',
                                            label: resultSet.table[0][1] || 'Default Y-Axis Label',
                                            maxValue: findMaxInRange(resultSet),
                                        } // Top y-axis.
                                    }
                                },
                                vAxis: {
                                    title: "Y-Axis Label",
                                    viewWindow: {
                                        max: findMaxInRange(resultSet) + 1, // Adding some padding
                                    },
                                    annotations: {
                                        alwaysOutside: true
                                    }
                                },
                                hAxis: {
                                    slantedText: true
                                },
                                chartArea: {
                                    left: 70, // Adjust padding for Y-axis title
                                    right: 70, // Adjust padding to avoid clipping
                                    top: 80, // Adjust top padding to fit chart title
                                    bottom: 90, // Adjust bottom padding for X-axis title and labels
                                    width: '80%',
                                    height: '70%',
                                },
                                bar: { groupWidth: '90%' }, // Adjust bar width for better aesthetics
                                tooltip: {
                                    isHtml: true,
                                    trigger: 'focus', // Trigger tooltip on focus
                                },
                                legend: {
                                    position: 'right',
                                    alignment: 'center',
                                    textStyle: { color: '#000', fontSize: 12 },
                                },
                                height: winHeight, // Dynamic height for the chart
                                width: winWidth, // Dynamic width for the chart
                                fontFamily: 'Montserrat', // Set global font
                                fontSize: '10', // Set global font size
                                series: resultSet.series, // Series data passed dynamically
                            },
                            view: { 'columns': resultSet.view }, // Columns to display in the chart
                        };
                    }

                    if (resultSet.plot_type === 1) {
                        options = {
                            chartType: 'Line',
                            dataTable: rows,
                            containerId: 'chart',
                            options: {
                                chart: {
                                    title: resultSet.table[0][2] || 'Default Graph Title',
                                },
                                title: resultSet.table[0][2] || 'Default Graph Label',
                                axes: {
                                    x: {
                                        0: {
                                            side: 'bottom',
                                            label: resultSet.table[0][1] || 'Default X-Axis Label',
                                            slantedText: true,
                                            slantedTextAngle: 45,
                                        } // Top x-axis.
                                    },
                                    y: {
                                        0: {
                                            side: 'left',
                                            label: resultSet.table[0][0] || 'Default Y-Axis Label',
                                            maxValue: findMaxInRange(resultSet),
                                            minValue: findMinInRange(resultSet),
                                            range: {
                                                max: findMaxInRange(resultSet), // Ensure the chart adheres to this upper limit
                                                min: findMinInRange(resultSet)         // Set a minimum value for better scaling
                                            },
                                            viewWindow: {
                                                min: findMinInRange(resultSet), // Ensure the view window is explicitly lower
                                                max: findMaxInRange(resultSet) + 0.1, // Add space above for better scaling
                                            },
                                            baseline: findMinInRange(resultSet), // Set the baseline slightly lower for improved visibility
                                            baselineColor: '#FF46A2', // Optional
                                        } // Top y-axis.
                                    }
                                },
                                vAxis: {
                                    title: resultSet.table[0][0] || 'Default Y-Axis Label', // Same Y-axis logic
                                    maxValue: findMaxInRange(resultSet), // Apply the calculated max value here
                                    minValue: findMinInRange(resultSet),
                                    viewWindow: {
                                        max: findMaxInRange(resultSet), // Ensure the chart adheres to this upper limit
                                        min: findMinInRange(resultSet)         // Set a minimum value for better scaling
                                    },
                                    range: {
                                        max: findMaxInRange(resultSet),
                                        min: findMinInRange(resultSet)
                                    },
                                    textStyle: {
                                        fontSize: 12, // Tick labels font size
                                    },
                                    titleTextStyle: {
                                        fontSize: 14, // Title font size
                                    },
                                    baseline: findMinInRange(resultSet), // Set the baseline slightly lower for improved visibility
                                    baselineColor: '#FF46A2', // Optional
                                },
                                hAxis: {
                                    title: resultSet.table[0][1] || 'Default X-Axis Label', // Add X-axis title dynamically
                                    slantedText: true,
                                    scaleType: 'mirrorLog'
                                },
                                height: winHeight,
                                lineWidth: 2,
                                interpolateNulls: true,
                                legend: {
                                    position: 'left',
                                    alignment: 'center',
                                    textStyle: { color: '#000', fontSize: 12 },
                                    trigger: 'hover', // Highlight data when hovering over legend items
                                },
                                chartArea:{
                                    left: 50,
                                    right: 200,
                                    top: 50,
                                    width: '95%',
                                    height: '80%',
                                },
                                tooltip: {
                                    isHtml: true,
                                    trigger: 'selection',
                                    showColorCode: true,
                                },
                                series: {
                                    0: { color: '#007bff', lineWidth: 1.5 },
                                    1: { color: '#ff5733', lineWidth: 1.5 },
                                },
                            }
                        };

                    }

                    let bar = new google.visualization.ChartWrapper(options);


                    let cssClassNames = {
                        'headerRow': 'google-visualization-table-table',
                        'tableRow': 'table-cell',
                        'oddTableRow': 'table-cell',
                        'selectedTableRow': 'table-cell',
                        'hoverTableRow': 'table-cell',
                        'tableCell': 'table-cell',
                        'table': 'google-visualization-table-table'
                    };

                    let table = new google.visualization.ChartWrapper({
                        'chartType': 'Table',
                        'containerId': 'tableD',
                        'options': {
                            'showRowNumber': false, 
                            'allowHtml': true, 
                            'cssClassNames': cssClassNames,
                            height:400,
                            width: '100%'
                        }
                    });

                    if (onSelectionChange) {
                        onSelectionChange({
                            selectedItems: selectedFilters.length > 0 ? resultSet.cities.filter((city) => selectedFilters.includes(city)).length : resultSet.cities.slice(0, 10).length,
                            errorMessage: '',
                        });
                    }
                    let categoryPicker1 = new google.visualization.ControlWrapper({
                        'controlType': 'CategoryFilter',
                        'containerId': 'categorySelector1',
                        'state': { 'selectedValues': selectedFilters.length > 0 ? selectedFilters : resultSet.cities.slice(0, 10) },
                        'options': {
                            'filterColumnLabel': 'City',
                            'ui': {
                                'labelStacking': 'vertical',
                                'label': 'Country',
                                'allowMultiple': true,
                                'allowNone': false,
                                'allowTyping': false,
                                'cssOptions': {
                                    // Add style for disabled options
                                    'disabledCssClass': 'disabled-option',
                                    'googleMenuCssClass': 'custom-dropdown-height'

                                },
                                'limit': 13,
                                'caption': 'Choose a country...'
                            }
                        }
                    });

                    let categoryPicker2 = new google.visualization.ControlWrapper({
                        'controlType': 'CategoryFilter',
                        'containerId': 'categorySelector2',
                        'id': 'dateSelector',
                        'state': { 'selectedValues': resultSet.years },
                        'options': {
                            'filterColumnLabel': 'Year',
                            'ui': {
                                'labelStacking': 'vertical',
                                'allowTyping': false,
                                'allowMultiple': false,
                                'allowNone': false,
                                'cssOptions': {
                                    // Add style for disabled options
                                    'disabledCssClass': 'disabled-option'
                                },
                                'limit': 13,
                            }
                        }
                    });

                    let regionPicker;

                    // Check if regions data exists
                    if (resultSet.regions && resultSet.regions.length > 0) {
                        try {
                            console.log('Creating region filter...');
                            
                            // Create data table to verify structure
                            const dataTable = google.visualization.arrayToDataTable(resultSet.table);
                            
                            const regionColumnIndex = dataTable.getColumnIndex('Region');
                            console.log('Region column index:', regionColumnIndex);

                            if (regionColumnIndex >= 0) {
                                // Get unique regions from the data (as fallback)
                                const uniqueRegions = resultSet.regions
                                
                                console.log('Available regions:', uniqueRegions);

                                const initialSelectedRegions =  uniqueRegions;
                                
                                regionPicker = new google.visualization.ControlWrapper({
                                    'controlType': 'CategoryFilter',
                                    'containerId': 'regionSelector',
                                    'dataTable': dataTable,
                                    'state': { 
                                        'selectedValues': initialSelectedRegions
                                    },
                                    'options': {
                                        'filterColumnLabel': 'Region',
                                        'ui': {
                                            'labelStacking': 'vertical',
                                            'label': 'Region',
                                            'allowMultiple': true,
                                            'allowNone': false,
                                            'allowTyping': false,
                                            'cssOptions': {
                                                'disabledCssClass': 'disabled-option',
                                                'googleMenuCssClass': 'custom-dropdown-height'
                                            },
                                            'limit': 13,
                                            'caption': `All regions (${uniqueRegions.length})`
                                        }
                                    }
                                });
                                
                                // Show the region selector
                                document.getElementById('regionSelector').style.display = 'inline-block';
                                
                                // Add event listener for region filter
                                google.visualization.events.addListener(regionPicker, 'statechange', function () {
                                    try {
                                        const selectedRegions = regionPicker.getState().selectedValues;
                                        console.log('Region selection changed:', selectedRegions);
                                        
                                        const currentDataTable = google.visualization.arrayToDataTable(resultSet.table);
                                        const regionColIndex = currentDataTable.getColumnIndex('Region');
                                        const filteredCities = [];
                                        
                                        if (selectedRegions && selectedRegions.length > 0) {
                                            // Get unique cities from selected regions
                                            const cityRegionMap = {};
                                            
                                            for (let i = 1; i < currentDataTable.getNumberOfRows(); i++) {
                                                const city = currentDataTable.getValue(i, 0); // City column (index 0)
                                                const region = currentDataTable.getValue(i, regionColIndex);
                                                
                                                if (region && selectedRegions.includes(region)) {
                                                    cityRegionMap[city] = true;
                                                }
                                            }
                                            
                                            filteredCities.push(...Object.keys(cityRegionMap));
                                            console.log('Filtered cities based on regions:', filteredCities);
                                            
                                            // Update city filter with filtered cities, respecting maxSelection
                                            categoryPicker1.setState({
                                                selectedValues: filteredCities.slice(0, maxSelection)
                                            });
                                            

                                        } else {
                                            // If no regions selected, show all cities (up to maxSelection)
                                            console.log('No regions selected, showing all cities');
                                            categoryPicker1.setState({
                                                selectedValues: resultSet.cities.slice(0, maxSelection)
                                            });
                                            regionPicker.setOption('ui.caption', 'Choose regions...');
                                        }
                                        
                                        categoryPicker1.draw();
                                        regionPicker.draw(); // Redraw to update caption
                                        
                                    } catch (error) {
                                        console.error('Error in region filter state change:', error);
                                    }
                                });
                                
                            } else {
                                console.warn('Region column not found in data table');
                                document.getElementById('regionSelector').style.display = 'none';
                            }
                        } catch (error) {
                            console.error('Error creating region filter:', error);
                            document.getElementById('regionSelector').style.display = 'none';
                        }
                    } else {
                        console.log('No regions data available');
                        document.getElementById('regionSelector').style.display = 'none';
                    }

                    google.visualization.events.addListener(categoryPicker1, 'statechange', function () {
                        const selectedValues = categoryPicker1.getState().selectedValues;

                        const selectedItems = selectedValues.length;
                        const selectedFilters = selectedValues;
                        // Define the limit
                        let errorMessage = '';

                        if (selectedValues.length > maxSelection) {
                            // Enforce limit: Reset state to the first MAX_SELECTION items
                            categoryPicker1.setState({
                                selectedValues: selectedValues.slice(0, maxSelection),
                            });

                            // Optionally, notify the user
                            alert(`You can only select up to ${maxSelection} items.`);
                            categoryPicker1.draw(); // Redraw to reflect the changes

                            errorMessage = `You can only select up to ${maxSelection} items.`;

                        }
                        if (onSelectionChange) {
                            onSelectionChange({
                                selectedItems,
                                errorMessage,
                            });
                        }

                        if (onSelectionFilters) {
                            onSelectionFilters({
                                selectedFilters,
                            });
                        }

                    });

                    google.visualization.events.addListener(categoryPicker2, 'statechange', function () {
                        const selectedValues = categoryPicker2.getState().selectedValues;
                        const selectedItems = selectedValues.length;
                        const selectedFilters = selectedValues;
                        // Define the limit
                        let errorMessage = '';

                        if (selectedValues.length > maxSelection) {
                            // Enforce limit: Reset state to the first MAX_SELECTION items
                            categoryPicker2.setState({
                                selectedValues: selectedValues.slice(0, maxSelection),
                            });

                            // Optionally, notify the user
                            alert(`You can only select up to ${maxSelection} items.`);
                            categoryPicker1.draw(); // Redraw to reflect the changes

                            errorMessage = `You can only select up to ${maxSelection} items.`;
                        }
                        if (onSelectionChange) {
                            onSelectionChange({
                                selectedItems,
                                errorMessage,
                            });
                        }
                        if (onSelectionFilters) {
                            onSelectionFilters({
                                selectedFilters,
                            });
                        }
                    });

                    // Example: Use a disabled CSS class in case of missing values
                    document.querySelectorAll('.disabled-option').forEach(el => {
                        el.style.color = '#aaa';
                        el.style.pointerEvents = 'none';
                    });

                    let data = google.visualization.arrayToDataTable(resultSet.table);

                    let dashboard = new google.visualization.Dashboard();

                    if (resultSet.plot_type === 2) {
                        const controls = [];

                        if ( regionPicker && document.getElementById("regionSelector").style.display !== "none") {
                            regionPicker.setDataTable(data);
                            controls.push(regionPicker);
                        }

                        controls.push(categoryPicker1, categoryPicker2);
                        dashboard.bind(controls, [bar, table]);
                        dashboard.draw(data);
                    } else {
                        categoryPicker2.setDataTable(data);
                        categoryPicker2.draw();


                        table = new google.visualization.ChartWrapper({
                            'chartType': 'Table',
                            'containerId': 'tableD2',
                            'options': {
                                'allowHtml': true, 
                                'cssClassNames': cssClassNames,
                                height:400,
                                width: '100%'
                            }
                        });


                        const plotData = new google.visualization.DataTable(resultSet.table_plot);
                        table.setDataTable(plotData);

                        // For plot_type 1, don't bind region filter to dashboard
                        // Instead, handle region filtering through event listeners only
                        dashboard.bind([categoryPicker1], [table]);
                        dashboard.draw(plotData);

                        // If region filter exists, handle it through manual filtering
                        if (
                            regionPicker &&
                            document.getElementById("regionSelector").style.display !== "none"
                        ) {
                            // Draw region filter separately (not bound to dashboard)
                            regionPicker.setDataTable(data);
                            regionPicker.draw();

                            // Add manual region filtering logic
                            google.visualization.events.addListener(
                            regionPicker,
                            "statechange",
                            function () {
                                const selectedRegions = regionPicker.getState().selectedValues;

                                // Filter cities based on regions and update categoryPicker1
                                const currentDataTable = google.visualization.arrayToDataTable(
                                resultSet.table
                                );
                                const regionColIndex = currentDataTable.getColumnIndex("Region");
                                const filteredCities = [];

                                if (selectedRegions && selectedRegions.length > 0) {
                                const cityRegionMap = {};
                                for (let i = 1; i < currentDataTable.getNumberOfRows(); i++) {
                                    const city = currentDataTable.getValue(i, 0);
                                    const region = currentDataTable.getValue(i, regionColIndex);
                                    if (region && selectedRegions.includes(region)) {
                                    cityRegionMap[city] = true;
                                    }
                                }
                                filteredCities.push(...Object.keys(cityRegionMap));
                                } else {
                                filteredCities.push(...resultSet.cities);
                                }

                                categoryPicker1.setState({
                                selectedValues: filteredCities.slice(0, maxSelection),
                                });
                                categoryPicker1.draw();
                            }
                            );
                        }
                    }

                    if (resultSet.table[0][2].length > 66) {
                        google.visualization.events.addListener(bar, 'ready', () => {
                            const svg = document.querySelector('#chart svg');
                            if (svg) {
                                const tspans = svg.querySelectorAll('text tspan');
                                tspans.forEach(tspan => {
                                    tspan.setAttribute('y', '15.5');
                                });
                            }
                        });
                    }

                    google.visualization.events.addListener(table, 'ready', function (event) {

                        var tableData = table.getDataTable();
                        var csvData = google.visualization.dataTableToCsv(tableData);

                        if (resultSet.plot_type === 1) {
                            $('#categorySelector2').hide();
                            $('#cat-spacer').hide();

                            tableData = table.getDataTable();
                            let filteredData = tableData;
                            let group = filteredData.getDistinctValues(0);

                            var columns = [2], groupColumns = [];
                            for (let i = 0; i < group.length; i++) {
                                var label = group[i];
                                columns.push({
                                    type: 'number',
                                    label: label,
                                    calc: (function (name) {
                                        return function (dt, row) {
                                            return (dt.getValue(row, 0) == name) ? dt.getValue(row, 1) : null;
                                        }
                                    })(label)
                                });
                                groupColumns.push({
                                    type: 'number',
                                    label: label,
                                    column: i + 1,
                                    aggregation: google.visualization.data.sum
                                });
                            }

                            rowHeader = [];
                            rowHeader.push('Year');
                            for (let i = 0; i < groupColumns.length; i++) {
                                rowHeader.push(groupColumns[i].label);
                            }

                            let view = new google.visualization.DataView(filteredData);
                            view.setColumns(columns);

                            let groupedData = google.visualization.data.group(view, [0], groupColumns);

                            bar.setDataTable(groupedData);
                            bar.draw();

                            let table2 = new google.visualization.ChartWrapper({
                                'chartType': 'Table',
                                'containerId': 'tableD',
                                'options': {
                                    'allowHtml': true, 
                                    'cssClassNames': cssClassNames,
                                    height:400,
                                    width: '100%'
                                }
                            });

                            table2.setDataTable(groupedData);
                            table2.draw();

                            tableData = table2.getDataTable();
                            csvData = google.visualization.dataTableToCsv(tableData);

                            //map
                            $('#map-selector').val(selectedYear);

                            let dataTable = table.getDataTable();
                            group = dataTable.getDistinctValues(0);

                            columns = [2], groupColumns = [];
                            for (let i = 0; i < group.length; i++) {
                                let label = group[i];
                                columns.push({
                                    type: 'number',
                                    label: label,
                                    calc: (function (name) {
                                        return function (dt, row) {
                                            return (dt.getValue(row, 0) == name) ? dt.getValue(row, 1) : null;
                                        }
                                    })(label)
                                });
                                groupColumns.push({
                                    type: 'number',
                                    label: label,
                                    column: i + 1,
                                    aggregation: google.visualization.data.sum
                                });
                            }

                            view = new google.visualization.DataView(dataTable);
                            view.setColumns(columns);

                            groupedData = google.visualization.data.group(view, [0], groupColumns);

                            let dt = transposeDataTable(groupedData);

                            let myView = new google.visualization.DataView(dt);
                            myView.setColumns([0, Number(selectedYear)]);

                            let map = new google.visualization.ChartWrapper({
                                'chartType': 'GeoChart',
                                'containerId': 'map',
                                'options': {
                                    region: 'ZA',
                                    displayMode: 'markers',
                                    resolution: 'provinces',
                                    theme: 'material',
                                    colorAxis: { colors: ['#FED976', '#FC4E2A', '#800026'] },
                                    height: winHeight,
                                    width: winWidth,
                                    tooltip: { isHtml: true },
                                    keepAspectRatio: true
                                }
                            });

                            // map.setDataTable(myView);
                            // map.draw();

                            $('#map-selector').on('change', function (event) {
                                event.preventDefault();
                                var year = Number(document.getElementById('map-selector').value);


                                var tableData = table.getDataTable();

                                var group = tableData.getDistinctValues(0);

                                var columns = [2], groupColumns = [];
                                for (var i = 0; i < group.length; i++) {
                                    var label = group[i];
                                    columns.push({
                                        type: 'number',
                                        label: label,
                                        calc: (function (name) {
                                            return function (dt, row) {
                                                return (dt.getValue(row, 0) == name) ? dt.getValue(row, 1) : null;
                                            }
                                        })(label)
                                    });
                                    groupColumns.push({
                                        type: 'number',
                                        label: label,
                                        column: i + 1,
                                        aggregation: google.visualization.data.sum
                                    });
                                }

                                var view = new google.visualization.DataView(tableData);
                                view.setColumns(columns);

                                var groupedData = google.visualization.data.group(view, [0], groupColumns);

                                var dt = transposeDataTable(groupedData);

                                var myView = new google.visualization.DataView(dt);

                                myView.setColumns([0, Number(year)]);

                                var map = new google.visualization.ChartWrapper({
                                    'chartType': 'GeoChart',
                                    'containerId': 'map',
                                    'options': {
                                        region: 'ZA',
                                        displayMode: 'markers',
                                        resolution: 'provinces',
                                        theme: 'material',
                                        colorAxis: { colors: ['#FED976', '#FC4E2A', '#800026'] },
                                        height: winHeight,
                                        width: winWidth,
                                        tooltip: { isHtml: true },
                                        keepAspectRatio: true
                                    }
                                });

                                // map.setDataTable(myView);
                                // map.draw();

                                $('#map-selector').val(year);
                            });
                        }

                        var csvString = rowHeader.join(',') + '\n' + csvData + '\n';

                        document.getElementById('csv').value = csvString;


                        let tmpDiv = document.createElement('div');
                        tmpDiv.setAttribute('style', 'width:2000px;height:800px;font-size:10px,fontFamily:Montserrat,visibility:hidden');
                        document.body.appendChild(tmpDiv);

                        var optionsTmp = {};

                        if (resultSet.plot_type === 2) {
                            optionsTmp = {
                                chart: {
                                    title: resultSet.table[0][2] || 'Default Graph Title',
                                },
                                title: resultSet.table[0][2] || 'Default Graph Label',
                                chartType: 'Bar',
                                dataTable: rows,
                                containerId: 'chart',
                                options: {
                                    chart: {
                                        title: resultSet.table[0][2] || 'Default Graph Title',
                                    },
                                    title: resultSet.table[0][2] || 'Default Graph Title', // Main chart title
                                    stacked: true, // Enable stacking
                                    bars: 'vertical', // Vertical bar chart
                                    axes: {
                                        x: {
                                            0: {
                                                side: 'bottom',
                                                label: resultSet.table[0][0] || 'Default X-Axis Label',
                                                slantedText: true,
                                                slantedTextAngle: 45
                                            } // Top x-axis.
                                        },
                                        y: {
                                            0: {
                                                side: 'left',
                                                label: resultSet.table[0][1] || 'Default Y-Axis Label',
                                                maxValue: findMaxInRange(resultSet),
                                            } // Top y-axis.
                                        }
                                    },
                                    hAxis: {
                                        slantedText: true
                                    },
                                    chartArea: {
                                        left: 70, // Adjust padding for Y-axis title
                                        right: 70, // Adjust padding to avoid clipping
                                        top: 80, // Adjust top padding to fit chart title
                                        bottom: 90, // Adjust bottom padding for X-axis title and labels
                                        width: '80%',
                                        height: '70%',
                                    },
                                    bar: { groupWidth: '90%' }, // Adjust bar width for better aesthetics
                                    tooltip: {
                                        isHtml: true,
                                        trigger: 'focus', // Trigger tooltip on focus
                                    },
                                    legend: {
                                        position: 'right',
                                        alignment: 'center',
                                        textStyle: { color: '#000', fontSize: 12 },
                                    },
                                    height: winHeight, // Dynamic height for the chart
                                    width: winWidth, // Dynamic width for the chart
                                    fontFamily: 'Montserrat', // Set global font
                                    fontSize: '10', // Set global font size
                                    series: resultSet.series, // Series data passed dynamically
                                },
                                view: { 'columns': resultSet.view }
                            };

                            var barTmp = new google.visualization.ChartWrapper(optionsTmp);
                            barTmp.draw(tmpDiv);

                            //var dataSet = Number(document.getElementById('map-selector').value);

                            var dataSet = resultSet.table[0][2];
                            var dt = table.getDataTable();
                            var myView = new google.visualization.DataView(dt);

                            myView.setColumns([0, dataSet]);

                            let map = new google.visualization.ChartWrapper({
                                'chartType': 'GeoChart',
                                'containerId': 'map',
                                'options': {
                                    region: 'ZA',
                                    displayMode: 'markers',
                                    resolution: 'provinces',
                                    theme: 'material',
                                    colorAxis: { colors: ['#FED976', '#FC4E2A', '#800026'] },
                                    height: winHeight,
                                    width: winWidth,
                                    tooltip: { isHtml: true },
                                    keepAspectRatio: true
                                }
                            });

                            // map.setDataTable(myView);
                            //map.draw();

                            $('#map-selector').on('change', function (event) {
                                event.preventDefault();
                                var dataSet = Number(document.getElementById('map-selector').value);
                                dataSet = dataSet + 1;

                                var dt = table.getDataTable();
                                var myView = new google.visualization.DataView(dt);

                                myView.setColumns([0, dataSet]);

                                let map = new google.visualization.ChartWrapper({
                                    'chartType': 'GeoChart',
                                    'containerId': 'map',
                                    'options': {
                                        region: 'ZA',
                                        displayMode: 'markers',
                                        resolution: 'provinces',
                                        theme: 'material',
                                        colorAxis: { colors: ['#FED976', '#FC4E2A', '#800026'] },
                                        height: winHeight,
                                        width: winWidth,
                                        tooltip: { isHtml: true },
                                        keepAspectRatio: true
                                    }
                                });

                                //map.setDataTable(myView);
                                //map.draw();
                            });
                        }

                        if (resultSet.plot_type === 1) {
                            var tableData = table.getDataTable();
                            var filteredData = tableData;
                            var group = filteredData.getDistinctValues(0);

                            var columns = [2], groupColumns = [];
                            for (var i = 0; i < group.length; i++) {
                                var label = group[i];
                                columns.push({
                                    type: 'number',
                                    label: label,
                                    calc: (function (name) {
                                        return function (dt, row) {
                                            return (dt.getValue(row, 0) == name) ? dt.getValue(row, 1) : null;
                                        }
                                    })(label)
                                });
                                groupColumns.push({
                                    type: 'number',
                                    label: label,
                                    column: i + 1,
                                    aggregation: google.visualization.data.sum
                                });
                            }

                            optionsTmp = {
                                chartType: 'Line',
                                dataTable: rows,
                                containerId: 'chart',
                                options: {
                                    chart: {
                                        title: resultSet.table[0][2] || 'Default Graph Title',
                                    },
                                    title: resultSet.table[0][2] || 'Default Graph Label',
                                    axes: {
                                        x: {
                                            0: {
                                                side: 'bottom',
                                                label: resultSet.table[0][1] || 'Default X-Axis Label',
                                                slantedText: true,
                                                slantedTextAngle: 45,
                                            } // Top x-axis.
                                        },
                                        y: {
                                            0: {
                                                side: 'left',
                                                label: resultSet.table[0][0] || 'Default Y-Axis Label',
                                                maxValue: findMaxInRange(resultSet),
                                                minValue: findMinInRange(resultSet),
                                                range: {
                                                    max: findMaxInRange(resultSet), // Ensure the chart adheres to this upper limit
                                                    min: findMinInRange(resultSet)         // Set a minimum value for better scaling
                                                },
                                                viewWindow: {
                                                    min: findMinInRange(resultSet), // Ensure the view window is explicitly lower
                                                    max: findMaxInRange(resultSet) + 0.1, // Add space above for better scaling
                                                },
                                                baseline: findMinInRange(resultSet), // Set the baseline slightly lower for improved visibility
                                                baselineColor: '#FF46A2', // Optional
                                            } // Top y-axis.
                                        }
                                    },
                                    vAxis: {
                                        title: resultSet.table[0][0] || 'Default Y-Axis Label', // Same Y-axis logic
                                        maxValue: findMaxInRange(resultSet), // Apply the calculated max value here
                                        minValue: findMinInRange(resultSet),
                                        viewWindow: {
                                            max: findMaxInRange(resultSet), // Ensure the chart adheres to this upper limit
                                            min: findMinInRange(resultSet)         // Set a minimum value for better scaling
                                        },
                                        range: {
                                            max: findMaxInRange(resultSet),
                                            min: findMinInRange(resultSet)
                                        },
                                        textStyle: {
                                            fontSize: 12, // Tick labels font size
                                        },
                                        titleTextStyle: {
                                            fontSize: 14, // Title font size
                                        },
                                        baseline: findMinInRange(resultSet), // Set the baseline slightly lower for improved visibility
                                        baselineColor: '#FF46A2', // Optional
                                    },
                                    hAxis: {
                                        title: resultSet.table[0][1] || 'Default X-Axis Label', // Add X-axis title dynamically
                                        slantedText: true,
                                        scaleType: 'mirrorLog'
                                    },
                                    height: winHeight,
                                    lineWidth: 2,
                                    interpolateNulls: true,
                                    legend: {
                                        position: 'left',
                                        alignment: 'center',
                                        textStyle: { color: '#000', fontSize: 12 },
                                        trigger: 'hover', // Highlight data when hovering over legend items
                                    },
                                    chartArea:{
                                        left: 50,
                                        right: 200,
                                        top: 50,
                                        width: '95%',
                                        height: '70%',
                                    },
                                    tooltip: {
                                        isHtml: true,
                                        trigger: 'selection',
                                        showColorCode: true,
                                    },
                                    series: {
                                        0: { color: '#007bff', lineWidth: 1.5 },
                                        1: { color: '#ff5733', lineWidth: 1.5 },
                                    },
                                }
                            };

                            var view = new google.visualization.DataView(filteredData);
                            view.setColumns(columns);

                            let groupedData = google.visualization.data.group(view, [0], groupColumns);

                            var barTmp = new google.visualization.ChartWrapper(optionsTmp);
                            barTmp.setDataTable(groupedData);
                            barTmp.draw(tmpDiv);

                        }
                        google.visualization.events.addListener(barTmp, 'ready',
                            function (event) {

                                var chartArea = tmpDiv.children[0];

                                var svgObject = chartArea.children[0].children[0];

                                var svg = svgObject.outerHTML;

                                let canvas = document.querySelector('canvas');
                                let ctx = canvas.getContext('2d');

                                if (svg) {
                                    console.error("svg", svg);
                                    return;
                                }

                                let renderObject = canvg.fromString(ctx, svg);

                                renderObject.start();

                                let dataUri = canvas.toDataURL("image/png");

                                document.getElementById('chartPng').value = dataUri;

                                document.body.removeChild(tmpDiv);
                            });

                        function transposeDataTable(dataTable) {
                            //step 1: let us get what the columns would be
                            var rows = [];//the row tip becomes the column header and the rest become
                            for (var rowIdx = 0; rowIdx < dataTable.getNumberOfRows(); rowIdx++) {
                                var rowData = [];
                                for (var colIdx = 0; colIdx < dataTable.getNumberOfColumns(); colIdx++) {
                                    rowData.push(dataTable.getValue(rowIdx, colIdx));
                                }
                                rows.push(rowData);
                            }
                            var newTB = new google.visualization.DataTable();
                            newTB.addColumn('string', dataTable.getColumnLabel(0));
                            newTB.addRows(dataTable.getNumberOfColumns() - 1);
                            var colIdx = 1;
                            for (var idx = 0; idx < (dataTable.getNumberOfColumns() - 1); idx++) {
                                var colLabel = dataTable.getColumnLabel(colIdx);
                                newTB.setValue(idx, 0, colLabel);
                                colIdx++;
                            }
                            for (var i = 0; i < rows.length; i++) {
                                var rowData = rows[i];
                                newTB.addColumn('number', rowData[0]); //assuming the first one is always a header
                                var localRowIdx = 0;

                                for (var j = 1; j < rowData.length; j++) {
                                    newTB.setValue(localRowIdx, (i + 1), rowData[j]);
                                    localRowIdx++;
                                }
                            }
                            return newTB;
                        }
                    });
                }
            });
        });
    }

    render() {
        return (
            <div>
                <div id="chart" style={{ fontSize: '9px', fontFamily: 'Montserrat', fontWeight: '500' }}></div>
                <input type="hidden" id="chartPng"></input>
            </div>
        );
    }
}
